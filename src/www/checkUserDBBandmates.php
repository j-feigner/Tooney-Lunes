<?php
session_start();

require 'DBConnect.php';

$sql = "SELECT mate_id
		FROM bandmates
		WHERE user_id = '". $_SESSION['user_id'] ."'
			AND mate_id = '". $_GET['mate_id'] ."';";
$result = $conn->query($sql);

$bandmatesResults = array();
while ($row = $result->fetch_assoc()) {
	$bandmatesResults[] = $row;
}

echo json_encode($bandmatesResults);
$conn->close();
exit();
?>