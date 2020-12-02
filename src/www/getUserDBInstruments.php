<?php

session_start();

require 'DBConnect.php';

if ($_SESSION['searchUserID'] != "") {
	$sql = "SELECT display_name
		FROM user_instruments ui, users u, instrument i
		WHERE u.user_id = '" . $_SESSION['searchUserID'] . "'
			AND u.user_id = ui.user_id
			AND ui.instr_id = i.instr_id;";
	$result = $conn->query($sql);

	$userInstrData = array();
	while ($row = $result->fetch_assoc()) {
		$userInstrData[] = $row;
	}
} else {
	$sql = "SELECT display_name
		FROM user_instruments ui, users u, instrument i
		WHERE u.user_id = '" . $_SESSION['user_id'] . "'
			AND u.user_id = ui.user_id
			AND ui.instr_id = i.instr_id;";
	$result = $conn->query($sql);

	$userInstrData = array();
	while ($row = $result->fetch_assoc()) {
		$userInstrData[] = $row;
	}
}
$conn->close();

echo json_encode($userInstrData);
exit();
?>