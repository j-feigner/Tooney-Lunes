<?php
session_start();

require 'DBConnect.php';

$sql = "SELECT username, email, u.user_id
		FROM bandmates b, users u
		WHERE b.user_id = '". $_SESSION['user_id'] ."'
			AND b.mate_id = u.user_id;";
$result = $conn->query($sql);

$mateDetails = array();
while ($row = $result->fetch_assoc()) {
	$mateDetails[] = $row;
}

echo json_encode($mateDetails);
$conn->close();
exit();
?>