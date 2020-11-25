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
		SET exp_id = NULL
		WHERE user_id = '". $_SESSION['user_id'] ."';";
$result = $conn->query($sql);

if (empty($_GET)) {
	// pass
} else {
	$sql = "SELECT exp_id
			FROM experience
			WHERE exp_title = '". rawurldecode($_GET['exp_title']) ."';";
	$result = $conn->query($sql);

	while ($row = $result->fetch_assoc()) {
		$newExpID = $row['exp_id'];
	}

	$sql = "UPDATE users
			SET exp_id = '". $newExpID ."'
			WHERE user_id = '". $_SESSION['user_id'] ."';";
	$result = $conn->query($sql);
}
$conn->close();
exit();
?>