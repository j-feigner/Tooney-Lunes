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

$sql = "SELECT exp_title
		FROM experience;";

$result = $conn->query($sql);

$expData = array();
while ($row = $result->fetch_assoc()) {
	$expData[] = $row;
}

echo json_encode($expData);

?>