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

	<?php
		session_start();
		if (count($_SESSION) > 1) { session_unset(); }
		//var_dump($_SESSION);
	?>

	<form id="loginForm" class="form" action="validate_login.php" method="POST">
		<img id="loginImg" class="form-img" src="images\login_title.png" />
		<input type="text" class="form-input" id="identifier" name="identifier" placeholder="Username / Email" required>
		<input type="password" class="form-input" id="password" name="password" placeholder="Password" required>
		<input type="submit" id="login-button" class="submit-button" value="Login">
		<p id="error" class="notice"></p>
		<p id="success" class="notice"></p>
		<?php if (isset($_SESSION['notice'])) {
			if ($_SESSION['notice'] == "inv_log") { ?>
				<script>noticeFadeIn("inv_log")</script>
			<?php } else if ($_SESSION['notice'] == "reg_succ") {?>
				<script>noticeFadeIn("reg_succ")</script>
		<?php }} unset($_SESSION['notice']); ?>
		<p id="registerLink" class="reg-or-log"><a class="reg-or-log" href="register.php">Register here</a></p>
	</form>
</body>

</html>