<?php
session_start();

$servername = "tooney-lunes";
$username = "root";
$password = "";
$dbname = "tuneyloonsdb";

// Connect to tooneylunes database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

// Get user id for current login
$current_user = $_SESSION["user_id"];

// Retrieve stringified JSON song data
$song = $_GET["song"];
$song_data = json_decode($song);

// Set and insert Song metadata into Songs table
$song_title = $song_data->title;
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

function getInstrumentID($conn, $instr_name) {
    $result = $conn->query("SELECT instr_id
                              FROM Instrument
                             WHERE '$instr_name' = Instrument.instr_name;");
    $row = $result->fetch_assoc();
    $instr_id = $row["instr_id"];
    return $instr_id;
}
?>