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

	$username = validate($_POST['username']);
	$email = validate($_POST['email']);
	$password = validate($_POST['password']);

	$sql = "SELECT username
	        FROM users
	        WHERE username = '$username';";
	$result = $conn->query($sql);
	$num_rows = $result->num_rows;
	if ($num_rows != 0) {
		$_SESSION['notice'] = "taken_u";
		header('location:register.php');
		$conn->close();
		exit();
	}

	$sql = "SELECT email
	        FROM users
	        WHERE email = '$email';";
	$result = $conn->query($sql);
	$num_rows = $result->num_rows;
	if ($num_rows != 0) {
		$_SESSION['notice'] = "taken_e";
		header('location:register.php');
		$conn->close();
		exit();
	}

	$sql = "INSERT INTO users (username, email, password)
	        VALUES ('$username', '$email', '$password');";
	if ($conn->query($sql)) {
		$_SESSION['notice'] = 'reg_succ';
		header('location:login.php');
		$conn->close();
		exit();
	} else {
		$_SESSION['notice'] = "insert_f";
		header('location:register.php');
		$conn->close();
		exit();
	}
?>