<?php
session_start();

require 'DBConnect.php';

if ($_SESSION['searchUserID'] != "") {
	$sql = "SELECT bio
			FROM users
			WHERE user_id = '". $_SESSION['searchUserID'] ."';";
	$result = $conn->query($sql);

	$userBio = array();
	while ($row = $result->fetch_assoc()) {
		$userBio[] = $row;
	}
} else {
	$sql = "SELECT bio
			FROM users
			WHERE user_id = '". $_SESSION['user_id'] ."';";
	$result = $conn->query($sql);

	$userBio = array();
	while ($row = $result->fetch_assoc()) {
		$userBio[] = $row;
	}
}
echo json_encode($userBio);
$conn->close();
exit();
?>