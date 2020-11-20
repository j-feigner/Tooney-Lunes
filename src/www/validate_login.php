<?php
	session_start();

	$servername = "tuneyloons";
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

	$identifier = validate($_POST['identifier']);
	$password = validate($_POST['password']);

	$sql = "SELECT *
	        FROM users
	        WHERE (username = '$identifier' OR email='$identifier')
				&& password = '$password';";
	$result = $conn->query($sql);
	$num_rows = $result->num_rows;

	if ($num_rows == 1) {
		while($row = $result->fetch_assoc()) {
			$_SESSION["username"] = $row["username"];
			$_SESSION["password"] = $row["password"];
			$_SESSION["email"] = $row["email"];
			$_SESSION["user_id"] = $row["user_id"];
			header('location:my_profile.php');
			$conn->close();
			exit();
		}
	} else {
		$_SESSION['notice'] = "inv_log";
		header('location:login.php');
		$conn->close();
		exit();
	}
?>