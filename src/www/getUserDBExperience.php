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

if ($_SESSION['searchUserID'] != "") { // set in searchDBUser.php
	$sql = "SELECT exp_title
			FROM users u, experience e
			WHERE u.user_id = '". $_SESSION['searchUserID'] ."'
				AND u.exp_id = e.exp_id;";
	$result = $conn->query($sql);

	$userExpData = array();
	while ($row = $result->fetch_assoc()) {
		$userExpData[] = $row;
	}
	$userExpData['searched'] = true;
} else {
	$sql = "SELECT exp_title
			FROM users u, experience e
			WHERE u.user_id = '". $_SESSION['user_id'] ."'
				AND u.exp_id = e.exp_id;";
	$result = $conn->query($sql);

	$userExpData = array();
	while ($row = $result->fetch_assoc()) {
		$userExpData[] = $row;
	}
	$userExpData['searched'] = false;
}
$conn->close();

echo json_encode($userExpData);
exit();
?>