<?php
session_start();

require 'DBConnect.php';

$sql = "DELETE FROM user_instruments
		WHERE user_id = '". $_SESSION['user_id'] ."';";
$result = $conn->query($sql);

if (!empty($_GET)) {
	$newInstrIDs = array();
	foreach ($_GET as $i => $instrName) {
		$sql = "SELECT instr_id
				FROM instrument
				WHERE display_name = '". rawurldecode($instrName) ."';";
		$result = $conn->query($sql);

		while ($row = $result->fetch_assoc()) {
			$newInstrIDs[] = $row;
		}
	}

	for ($i = 0; $i < count($newInstrIDs); $i++) {
		$sql = "INSERT INTO user_instruments (user_id, instr_id)
				VALUES ('". $_SESSION['user_id'] ."', '". $newInstrIDs[$i]['instr_id'] ."');";
		$result = $conn->query($sql);
	}
}
$conn->close();
exit();
?>