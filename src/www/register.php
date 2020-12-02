<!DOCTYPE html>

<html lang="en">

<head>
	<?php
		$header = file_get_contents("html\header.html");
        echo $header;
	?>
	<script type="text/javascript" src="js\style.js"></script>
</head>

<body>
	<?php
		$top_bar = file_get_contents("html\login_top_bar.html");
		echo $top_bar;
	?>

	<?php session_start(); ?>

	<form id="registerForm" class="form" action="validate_registration.php" method="POST">
		<img id="registerImg" class="form-img" src="images\register_title.png" />
		<input type="text" class="form-input" id="username" name="username" placeholder="Username" required>
		<input type="text" class="form-input" id="email" name="email" placeholder="Email" required>
		<input type="password" class="form-input" id="password" name="password" placeholder="Password" required>
		<input type="submit" id="register-button" class="submit-button" value="Register">
		<p class="notice" id="error"></p>
		<?php 
		if (isset($_SESSION['notice'])) {
			if ($_SESSION['notice'] == "taken_u") { ?>
				<script>noticeFade("taken_u")</script> <?php 
			} else if ($_SESSION['notice'] == "taken_e") { ?>
				<script>noticeFade("taken_e")</script> <?php 
			} else if ($_SESSION['notice'] == "insert_f") { ?>
				<script>noticeFade("insert_f")</script> <?php 
			}
		} unset($_SESSION['notice']); 
		?>
		<p id="registerLink" class="reg-or-log"><a class="reg-or-log" href="login.php">Log in</a></p>
	</form>
</body>

</html>