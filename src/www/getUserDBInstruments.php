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
		FROM user_instruments ui, users u, instrument i
		WHERE u.user_id = '" . $_SESSION['user_id'] . "'
			AND u.user_id = ui.user_id
			AND ui.instr_id = i.instr_id;";

$result = $conn->query($sql);

$userInstrData = array();
while ($row = $result->fetch_assoc()) {
	$userInstrData[] = $row;
}
$conn->close();

echo json_encode($userInstrData);
exit();
?>