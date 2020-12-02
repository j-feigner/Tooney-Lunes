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

$sql = "DELETE FROM user_genres
		WHERE user_id = '". $_SESSION['user_id'] ."';";
$result = $conn->query($sql);

if (empty($_GET)) {
	// pass
} else {
	$newGenreIDs = array();
	foreach ($_GET as $i => $genreTitle) {
		$sql = "SELECT genre_id
				FROM genre
				WHERE genre_title = '". rawurldecode($genreTitle) ."';";
		$result = $conn->query($sql);

		while ($row = $result->fetch_assoc()) {
			$newGenreIDs[] = $row;
		}
	}

	for ($i = 0; $i < count($newGenreIDs); $i++) {
		$sql = "INSERT INTO user_genres (user_id, genre_id)
				VALUES ('". $_SESSION['user_id'] ."', '". $newGenreIDs[$i]['genre_id'] ."');";
		$result = $conn->query($sql);
	}
}
$conn->close();
exit();
?>