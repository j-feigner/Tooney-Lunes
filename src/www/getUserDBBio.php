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

if ($_SESSION['searchUserID'] != "") {
	$sql = "SELECT bio
			FROM users
			WHERE user_id = '". $_SESSION['searchUserID'] ."';";
	$result = $conn->query($sql);

	$userBio = array();
	while ($row = $result->fetch_assoc()) {
		$userBio[] = $row;
	}
	$userBio['searched'] = true;
} else {
	$sql = "SELECT bio
			FROM users
			WHERE user_id = '". $_SESSION['user_id'] ."';";
	$result = $conn->query($sql);

	$userBio = array();
	while ($row = $result->fetch_assoc()) {
		$userBio[] = $row;
	}
	$userBio['searched'] = false;
}
echo json_encode($userBio);
$conn->close();
exit();
?>