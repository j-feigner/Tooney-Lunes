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

$sql = "UPDATE users
		SET bio = NULL
		WHERE user_id = '". $_SESSION['user_id'] ."';";
$result = $conn->query($sql);

if (empty($_GET) || $_GET['bio'] == "") {
	// pass
} else {
	$sql = "UPDATE users
			SET bio = '". rawurldecode($_GET['bio']) ."'
			WHERE user_id = '". $_SESSION['user_id'] ."';";
	$result = $conn->query($sql);
}
$conn->close();
exit();
?>