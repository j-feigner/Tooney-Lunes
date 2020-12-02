<?php

session_start();

require 'DBConnect.php';

if ($_SESSION['searchUserID'] != "") { // set in searchDBUser.php
	$sql = "SELECT genre_title
			FROM user_genres ug, users u, genre g
			WHERE u.user_id = '" . $_SESSION['searchUserID'] ."'
				AND u.user_id = ug.user_id
				AND ug.genre_id = g.genre_id;";

	$result = $conn->query($sql);

	$userGenreData = array();
	while ($row = $result->fetch_assoc()) {
		$userGenreData[] = $row;
	}
} else {
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
}
$conn->close();

echo json_encode($userGenreData);
exit();
?>