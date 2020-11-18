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
		FROM users u, experience e
		WHERE u.user_id = '" . $_SESSION['user_id'] ."'
			AND u.exp_id = e.exp_id;";

$result = $conn->query($sql);

$userExpData = array();
while ($row = $result->fetch_assoc()) {
	$userExpData[] = $row;
}

echo json_encode($userExpData);

?>