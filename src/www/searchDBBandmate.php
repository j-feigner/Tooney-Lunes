<?php
session_start();

require 'DBConnect.php';

function validate($data) {
	$data = htmlspecialchars(stripslashes(trim($data)));
	return $data;
}

$sql = "SELECT username, email, user_id
		FROM users
		WHERE username = '". validate($_GET['mate_search']) ."';";
$result = $conn->query($sql);

$userAccountResult = array();
while ($row = $result->fetch_assoc()) {
	$userAccountResult[] = $row;
}
$userAccountResult['??'] = $userAccountResult[0]['user_id'];

$_SESSION['mateSearchUserID'] = $userAccountResult[0]['user_id'];
$_SESSION['mateSearchUserUsername'] = $userAccountResult[0]['username'];
$_SESSION['mateSearchUserEmail'] = $userAccountResult[0]['email'];
echo json_encode($userAccountResult);
$conn->close();
exit();
?>