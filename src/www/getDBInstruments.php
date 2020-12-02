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

$sql = "SELECT instr_name
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