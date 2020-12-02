<?php
	session_start();
	$_SESSION['searchUserID'] = "";
	$_SESSION['searchUserUsername'] = "";
	$_SESSION['searchUserEmail'] = "";
	/*$_SESSION['mateSearchUserID'] = "";
	$_SESSION['mateSearchUserUsername'] = "";
	$_SESSION['mateSearchUserEmail'] = "";*/
?>

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
        $top_bar = file_get_contents("html\myprofile_title_top_bar.html");
        echo $top_bar;
    ?>

    <div id="usernameContainer" class="profile-details-container">
        <p id="username" class="profile-details"><?=$_SESSION["username"]?></p>
    </div>
    <div id="emailContainer" class="profile-details-container">
        <p id="email" class="profile-details"><?=$_SESSION["email"]?></p>
    </div>
    <script>profileDetailsSlideIn()</script>

    <div class="profile-info-container">
		<div id="userBioContainer" class="info-container">
			<div class="info-oval">
				<p class="info-title">Biography</p>
				<img onclick="showBioEditor()" id="bioSettings" class="settings-img" src="images\settings.png" />
			</div>
			<p id="bioInfo" class="info"><div id="fadeOverlay"></div></p>
			<textarea name="bioInput" id="bioInput" maxlength="200"></textarea>
			<button type="button" id="bioSubmit" class="info-submit" onclick="updateUserBio()">Submit</button>
			<p id="wordCount"></p>
			<script>populateUserBio()</script>
		</div>
        <div id="genreInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Genre Preferences</p>
                <img onclick="showGenreCheckboxes()" id="genreSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="genreInfo" class="info"></p>
            <div class="multi-select">
                <div id="genreCheckboxes"></div>
            </div>
			<script>populateGenres()</script>
			<script>populateUserGenres()</script>
        </div>
        <div id="instrInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Instrument Specialties</p>
                <img onclick="showInstrCheckboxes()" id="instrSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="instrInfo" class="info"></p>
            <div class="multi-select">
                <div id="instrCheckboxes"></div>
            </div>
			<script>populateInstruments()</script>
			<script>populateUserInstruments()</script>
        </div>
        <div id="expInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Music Experience</p>
                <img onclick="showExpRadios()" id="expSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="expInfo" class="info"></p>
            <div class="multi-select">
                <div id="expRadios"></div>
            </div>
			<script>populateExperience()</script>
			<script>populateUserExperience()</script>
        </div>
    </div>

	<div class="info-container" id="songLibraryContainer">
		<div class="info-oval">
			<p class="info-title">Song Library</p>
		</div>
	</div>

	<div class="social-container" id="socialContainer">
        <div class="search-area" id="searchArea">
			<div class="search-by" id="searchBy">
				<label class="search-by-label">Search By...</label>
				<select class="search-by-list" id="searchByList">
					<option selected="selected" value="user">User</option>
					<option value="genre">Genre</option>
					<option value="instrument">Instrument</option>
					<option value="experience">Experience</option>
				</select>
			</div>
			<div class="search-container" id="searchContainer">
				<table class="search-elements-container">
					<tr>
						<td class="search-column" id="searchColumn">
							<input type="text" id="searchUser" class="search-user" placeholder="Search user"></td>
						<td><a href="#"><span id="clearIcon" class="material-icons">clear</span></a></td>
						<td><a href="#"><span id="searchIcon" class="material-icons">search</span></a></td>
						<script>searchUserEventListener()</script>
						<script>setSearchFocusStyle()</script>
					</tr>
				</table>
			</div>
		</div>
		<div id="searchResult" class="social-content" style="display:none;"></div>
		<div id="otherThings" class="social-content">SOCIAL CONTENT</div>
	</div>

	<div id="bandmatesMenu">
		<h1>Your Bandmates</h1>
	</div>
	<script>bandmateMenuStyle()</script>
	<script>populateUserDBBandmates()</script>

</body>

</html>