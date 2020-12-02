<?php

session_start();

require 'DBConnect.php';

$sql = "SELECT display_name
		FROM instrument;";

$result = $conn->query($sql);

$instrData = array();
while ($row = $result->fetch_assoc()) {
	$instrData[] = $row;
}
$conn->close();

echo json_encode($instrData);
exit();
?>