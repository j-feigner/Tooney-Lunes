<?php
session_start();


require 'DBConnect.php';

function validate($data) {
	$data = htmlspecialchars(stripslashes(trim($data)));
	return $data;
}

$identifier = validate($_POST['identifier']);
$sql = "SELECT username
		FROM users
		WHERE username = '$identifier' OR email = '$identifier';";
$result = $conn->query($sql);
$num_rows = $result->num_rows;

if ($num_rows == 1) {
	$sql = "SELECT password
			FROM users
			WHERE username = '$identifier' OR email = '$identifier';";
	$result = $conn->query($sql);
	while ($row = $result->fetch_assoc()) {
		$DBPassword = $row['password'];
	}

	if (password_verify(validate($_POST['password']), $DBPassword)) {
		$sql = "SELECT *
				FROM users
				WHERE (username = '$identifier' OR email='$identifier');";
		$result = $conn->query($sql);

		while($row = $result->fetch_assoc()) {
			$_SESSION["user_id"] = $row["user_id"];
			$_SESSION["username"] = $row["username"];
			$_SESSION["password"] = $row["password"];
			$_SESSION["email"] = $row["email"];
			$_SESSION["user_id"] = $row["user_id"];
			header('location:my_profile.php');
		}
		$_SESSION['searchUserID'] = "";
		$_SESSION['searchUserUsername'] = "";
		$_SESSION['searchUserEmail'] = "";
		/*$_SESSION['mateSearchUserID'] = "";
		$_SESSION['mateSearchUserUsername'] = "";
		$_SESSION['mateSearchUserEmail'] = "";*/
	} else {
			$_SESSION['notice'] = "inv_log";
			header('location:login.php');
	}
} else {
	$_SESSION['notice'] = "inv_log";
	header('location:login.php');
}
$conn->close();
exit();
?>