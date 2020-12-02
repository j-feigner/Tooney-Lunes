<?php
session_start();

require 'DBConnect.php';

// Get user id for current login
$current_user = $_SESSION["user_id"];

// Retrieve stringified JSON song data
$song = $_GET["song"];
$song_data = json_decode($song);

// Check for unique title in user library
$song_title = $song_data->title;
if(!titleAvailable($conn, $current_user, $song_title)) {
    echo "Song Title Unavailable, Song not Saved";
    die();
}

// Insert newly titled song metadata
$song_tempo = $song_data->tempo;
$song_insert = "INSERT INTO Songs(user_id, song_title, tempo)
                VALUES ('$current_user', '$song_title', '$song_tempo');";
if(!$conn->query($song_insert)) {
    echo "Error: ".$conn->error;
}


// Set and insert Song_Track data into Song-Tracks table for current song_id
$song_id = $conn->insert_id;
$song_tracks = $song_data->tracks;
for($i = 0; $i < count($song_tracks); $i++) {
    $track = $song_tracks[$i];
    $instr_id = getInstrumentID($conn, $track->instrument);
    $track_data = serialize($track->beat_data);

    $tracks_insert = "INSERT INTO Song_Tracks(song_id, instr_id, track_data) 
                      VALUES ('$song_id', '$instr_id', '$track_data');";

    if(!$conn->query($tracks_insert)) {
        echo "Error: ".$conn->error;
    }
}

echo "Song Saved Successfully";

// Returns instr_id from Instrument table from given instrument name string
function getInstrumentID($conn, $instr_name) {
    $result = $conn->query("SELECT instr_id
                              FROM Instrument
                             WHERE '$instr_name' = Instrument.instr_name;");
    $row = $result->fetch_assoc();
    $instr_id = $row["instr_id"];
    return $instr_id;
}

// Returns true if song title is not taken in user's library
function titleAvailable($conn, $user_id, $title) {
    $sql = "SELECT song_id
              FROM Songs
             WHERE '$user_id' = Songs.user_id
               AND '$title' = Songs.song_title;";
    $result = $conn->query($sql);
    if($result->num_rows == 0) {
        return true;
    } else {
        return false;
    }
}
?>