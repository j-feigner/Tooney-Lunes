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

function validate($data) {
	$data = htmlspecialchars(stripslashes(trim($data)));
	return $data;
}

$sql = "SELECT username, email, user_id
		FROM users
		WHERE username = '". validate($_GET['search']) ."';";
$result = $conn->query($sql);

$userAccountResult = array();
while ($row = $result->fetch_assoc()) {
	$userAccountResult[] = $row;
}

if (count($userAccountResult) == 0) {
	echo json_encode($userAccountResult);
	$conn->close();
	exit();
}

$sql = "SELECT instr_name
		FROM user_instruments ui, users u, instrument i
		WHERE u.user_id = '" . $userAccountResult[0]['user_id'] . "'
			AND u.user_id = ui.user_id
			AND ui.instr_id = i.instr_id;";
$result = $conn->query($sql);

$userInstrumentResult = array();
while ($row = $result->fetch_assoc()) {
	$userInstrumentResult[] = $row;
}

$sql = "SELECT genre_title
		FROM user_genres ug, users u, genre g
		WHERE u.user_id = '" . $userAccountResult[0]['user_id'] ."'
			AND u.user_id = ug.user_id
			AND ug.genre_id = g.genre_id;";
$result = $conn->query($sql);

$userGenresResult = array();
while ($row = $result->fetch_assoc()) {
	$userGenresResult[] = $row;
}

$sql = "SELECT exp_title
		FROM users u, experience e
		WHERE u.user_id = '". $userAccountResult[0]['user_id'] ."'
			AND u.exp_id = e.exp_id;";
$result = $conn->query($sql);

$userExperienceResult = array();
while ($row = $result->fetch_assoc()) {
	$userExperienceResult[] = $row;
}

$userData = array_merge($userAccountResult, $userInstrumentResult, $userGenresResult, $userExperienceResult);

echo json_encode($userData);
$conn->close();
exit();
?>