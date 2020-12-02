<?php

session_start();

$servername = "tooney-lunes";
$username = "root";
$password = "";
$dbname = "tuneyloonsdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT genre_title
		FROM genre;";

$result = $conn->query($sql);

$genreData = array();
while ($row = $result->fetch_assoc()) {
	$genreData[] = $row;
}
$conn->close();

echo json_encode($genreData);
exit();
?>