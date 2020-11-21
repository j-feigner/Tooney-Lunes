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
		FROM user_genres ug, users u, genre g
		WHERE u.user_id = '" . $_SESSION['user_id'] ."'
			AND u.user_id = ug.user_id
			AND ug.genre_id = g.genre_id;";

$result = $conn->query($sql);

$userGenreData = array();
while ($row = $result->fetch_assoc()) {
	$userGenreData[] = $row;
}
$conn->close();

echo json_encode($userGenreData);
exit();
?>