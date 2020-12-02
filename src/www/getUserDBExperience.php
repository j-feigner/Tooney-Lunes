<?php

session_start();

require 'DBConnect.php';

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
}
$conn->close();
echo json_encode($userExpData);
exit();
?>