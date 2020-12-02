<?php
session_start();

require 'DBConnect.php';

// Retrieve stringified JSON song data
$song = $_GET["song"];
$song_data = json_decode($song);

$song_title = $song_data->title;
$song_tempo = $song_data->tempo;

// Insert newly titled song metadata
$song_insert = "INSERT INTO Public_Songs(song_title, tempo)
                VALUES ('$song_title', '$song_tempo');";
if(!$conn->query($song_insert)) {
    echo "Song Insert Error: ".$conn->error;
}

// Set and insert Song_Track data into Song-Tracks table for current song_id
$song_id = $conn->insert_id;

$song_tracks = $song_data->tracks;
for($i = 0; $i < count($song_tracks); $i++) {
    $track = $song_tracks[$i];
    $instr_id = getInstrumentID($conn, $track->instrument);
    $track_name = $track->label;
    $track_data = serialize($track->beat_data);

    $tracks_insert = "INSERT INTO Public_Song_Tracks(public_song_id, instr_id, track_name, track_data) 
                    VALUES ('$song_id', '$instr_id', '$track_name', '$track_data');";

    if(!$conn->query($tracks_insert)) {
        echo "Track Insert Error: ".$conn->error;
    }
}

echo $song_id;

// Returns instr_id from Instrument table from given instrument name string
function getInstrumentID($conn, $instr_name) {
    $result = $conn->query("SELECT instr_id
                              FROM Instrument
                             WHERE '$instr_name' = Instrument.instr_name;");
    $row = $result->fetch_assoc();
    $instr_id = $row["instr_id"];
    return $instr_id;
}
?>