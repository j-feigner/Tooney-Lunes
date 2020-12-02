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

// JSON to be built from DB and echoed to script
$song_json = array();

// Find song by user id and unique song title
$current_user = $_SESSION["user_id"];
$song_title = $_GET["title"];
$sql = "SELECT *
          FROM Songs
         WHERE Songs.user_id = '$current_user'
           AND Songs.song_title = '$song_title';";
$result = $conn->query($sql);
if($result->num_rows == 1) {
    $row = $result->fetch_assoc();

    // Get song_id for Song_Tracks query
    $song_id = $row["song_id"];

    // Assign appropriate key / value pairs to JSON
    $song_json["title"] = $row["song_title"];
    $song_json["tempo"] = $row["tempo"];
    $song_json["tracks"] = array();
} else {
    echo "Result not found";
    die();
}

// Find song tracks by song id and assign track arrays to JSON
$sql = "SELECT *
          FROM Song_Tracks
         WHERE Song_Tracks.song_id = '$song_id'
         ORDER BY Song_Tracks.track_id;";
$result = $conn->query($sql);
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $track_name = $row["track_name"];
        $instr_name = getInstrumentName($conn, $row["instr_id"]);
        $track_data = unserialize($row["track_data"]);
        $track_json = array(
            "name" => $track_name,
            "instrument" => $instr_name,
            "beat_data" => $track_data
        );
        array_push($song_json["tracks"], $track_json);
    }
} else {
    echo "No tracks found";
    die();
}  

// Echo assembled JSON to script for processing
echo json_encode($song_json);

// Returns instrument name from Instrument table by given id
function getInstrumentName($conn, $instr_id) {
    $result = $conn->query("SELECT instr_name
                              FROM Instrument
                             WHERE '$instr_id' = Instrument.instr_id;");
    $row = $result->fetch_assoc();
    $instr_id = $row["instr_name"];
    return $instr_id;
}
?>