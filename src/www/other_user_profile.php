<?php session_start(); ?>

<!doctype html>

<html lang="en">

<head>
    <?php
        $header = file_get_contents("html\header.html");
        echo $header;
    ?>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <script type="text/javascript" src="js\style.js"></script>
    <script type="text/javascript" src="js\database.js"></script>
</head>

<body>
    <?php
        $top_bar = file_get_contents("html\userprofile_title_top_bar.html");
        echo $top_bar;
    ?>

    <div id="usernameContainer" class="profile-details-container">
        <p id="username" class="profile-details"><?=$_SESSION["searchUserUsername"]?></p>
    </div>
    <!--<div id="emailContainer" class="profile-details-container">
        <p id="email" class="profile-details"><?=$_SESSION["searchUserEmail"]?></p>
    </div>-->
	<div id="profilePictureContainer" class="profile-picture-container">
		<span id="addPhotoIcon" class="material-icons">add_a_photo</span>
	</div>
    <script>profileDetailsSlideIn()</script>

    <div class="profile-info-container">
		<div id="userBioContainer" class="info-container">
			<div class="info-oval">
				<p class="info-title">Biography</p>
			</div>
			<p id="bioInfo" class="info"><div id="fadeOverlay"></div></p>
			<script>populateUserBio()</script>
		</div>
        <div id="genreInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Genre Preferences</p>
            </div>
            <p id="genreInfo" class="info"></p>
            <div class="multi-select">
                <div id="genreCheckboxes"></div>
            </div>
			<script>populateUserGenres()</script>
        </div>
        <div id="instrInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Instrument Specialties</p>
            </div>
            <p id="instrInfo" class="info"></p>
            <div class="multi-select">
                <div id="instrCheckboxes"></div>
            </div>
			<script>populateUserInstruments()</script>
        </div>
        <div id="expInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Music Experience</p>
            </div>
            <p id="expInfo" class="info"></p>
            <div class="multi-select">
                <div id="expRadios"></div>
            </div>
			<script>populateUserExperience()</script>
        </div>
    </div>

	<!--
	<div class="social-container" id="socialContainer">
		<div class="search-container" id="searchContainer">
			<table class="search-elements-container">
				<tr>
					<td class="search-column" id="searchColumn">
						<input type="text" id="searchUser" class="search-user" placeholder="Search user"></td>
					<td><a href="#"><span id="clearIcon" class="material-icons">clear</span></a></td>
					<td><a href="#"><span id="searchIcon" class="material-icons">search</span></a></td>
					<script>searchUserEventListener(); setSearchFocusStyle()</script>
				</tr>
			</table>
		</div>
		<div id="searchResult" class="social-content" style="display:none;"></div>
		<div id="otherThings" class="social-content">HELLO</div>
	</div>
	-->

</body>

</html>