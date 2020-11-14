<!doctype html>

<html lang="en">

<head>
    <?php
        $header = file_get_contents("html\myprofile_title&style_css&style_jsHEADER.html");
        echo $header;
    ?>
</head>

<body>
    <?php
        $top_bar = file_get_contents("html\myprofile_title_top_bar.html");
        echo $top_bar;
    ?>

    <div id="usernameContainer" class="profile-details-container">
        <p id="username" class="profile-details">MyUsername</p>
    </div>
    <div id="emailContainer" class="profile-details-container">
        <p id="email" class="profile-details">MyEmail@gmail.com</p>
    </div>
    <script>profileDetailsSlideIn()</script>

    <div class="profile-info-container">
        <div id="genreInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Genre Preferences</p>
                <img onclick="showGenreCheckboxes()" id="genreSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="genreInfo" class="info">Rock</p>
            <div class="multi-select">
                <div id="genreCheckboxes">
                    <label for="rock"><input type="checkbox" id="rock" value="rock" name="genres" />Rock</label>
                    <label for="country"><input type="checkbox" id="country" value="country" name="genres" />Country</label>
                    <label for="blues"><input type="checkbox" id="blues" value="blues" name="genres" />Blues</label>
                    <label for="hip-hop"><input type="checkbox" id="hip-hop" value="hip-hop" name="genres" />Hip-Hop</label>
                    <label for="alternative"><input type="checkbox" id="alternative" value="alternative" name="genres" />Alternative</label>
                    <label for="classical"><input type="checkbox" id="classical" value="classical" name="genres" />Classical</label>
                </div>
            </div>
        </div>
        <div id="instrInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Instrument Specialty</p>
                <img onclick="showInstrCheckboxes()" id="instrSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="instrInfo" class="info">Piano, Guitar, Drums</p>
            <div class="multi-select">
                <div id="instrCheckboxes">
                    <label for="guitar"><input type="checkbox" id="guitar" value="guitar" name="instr" />Guitar</label>
                    <label for="piano"><input type="checkbox" id="piano" value="piano" name="instr" />Piano</label>
                    <label for="drums"><input type="checkbox" id="drums" value="drums" name="instr" />Drums</label>
                </div>
            </div>
        </div>
        <div id="expInfoContainer" class="info-container">
            <div class="info-oval">
                <p class="info-title">Music Experience</p>
                <img onclick="showExpCheckboxes()" id="expSettings" class="settings-img" src="images\settings.png" />
            </div>
            <p id="expInfo" class="info">Beginner</p>
            <div class="multi-select">
                <div id="expCheckboxes">
                    <label for="beginner"><input type="checkbox" id="beginner" value="beginner" name="exp" />Beginner</label>
                    <label for="intermediate"><input type="checkbox" id="intermediate" value="intermediate" name="exp" />Intermediate</label>
                    <label for="expert"><input type="checkbox" id="expert" value="expert" name="exp" />Expert</label>
                </div>
            </div>
        </div>
    </div>
</body>

</html>