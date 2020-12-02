<?php

session_start();

require 'DBConnect.php';

$sql = "SELECT genre_title
		FROM genre;";

$result = $conn->query($sql);

$genreData = array();
while ($row = $result->fetch_assoc()) {
	$genreData[] = $row;
}
$conn->close();

echo json_encode($genreData);
exit();
?>