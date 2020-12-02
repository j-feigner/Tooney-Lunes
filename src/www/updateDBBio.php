<?php
session_start();

require 'DBConnect.php';

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