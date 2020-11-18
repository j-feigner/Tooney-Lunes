<?php session_start() ?>

<!doctype html>

<html lang="en">

<head>
    <?php
        $header = file_get_contents("html\header.html");
        echo $header;
    ?>
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
        <div id="genreInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Genre Preferences</p>
                <img onclick="showGenreCheckboxes()" id="genreSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="genreInfo" class="info"></p>
			<script>populateUserGenres()</script>
            <div class="multi-select">
                <div id="genreCheckboxes"></div>
                <script>populateGenres()</script>
            </div>
        </div>
        <div id="instrInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Instrument Specialty</p>
                <img onclick="showInstrCheckboxes()" id="instrSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="instrInfo" class="info"></p>
			<script>populateUserInstruments()</script>
            <div class="multi-select">
                <div id="instrCheckboxes"></div>
                <script>populateInstruments()</script>
            </div>
        </div>
        <div id="expInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Music Experience</p>
                <img onclick="showExpCheckboxes()" id="expSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="expInfo" class="info"></p>
			<script>populateUserExperience()</script>
            <div class="multi-select">
                <div id="expCheckboxes"></div>
				<script>populateExperience()</script>
            </div>
        </div>
    </div>
</body>

</html>