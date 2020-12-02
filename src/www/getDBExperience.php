<?php

session_start();

require 'DBConnect.php';

$sql = "SELECT exp_title
		FROM experience;";

$result = $conn->query($sql);

$expData = array();
while ($row = $result->fetch_assoc()) {
	$expData[] = $row;
}
$conn->close();

echo json_encode($expData);
exit();
?>