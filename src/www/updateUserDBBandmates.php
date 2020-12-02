<?php
session_start();

require 'DBConnect.php';

$sql = "INSERT INTO bandmates
		VALUES ('". $_SESSION['user_id'] ."', '". $_GET['mate_id'] ."');";
$result = $conn->query($sql);

$conn->close();
exit();
?>