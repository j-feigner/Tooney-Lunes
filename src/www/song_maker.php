<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        $header = file_get_contents("html/header.html");
        echo $header;
    ?>
    <link rel="stylesheet" href="css/song_maker_style.css">
</head>
<body>
    <?php
        $top_bar = file_get_contents("html/tooney_title_top_bar.html");
        echo $top_bar;
    ?>

    <div id="pageContents" class="page-contents">
        <div id="introPrompt" class="song-maker-prompt">
            <div class="song-maker-prompt-intro">
                <div id="newSong" class="song-maker-prompt-button">New Song</div>
                <div id="loadSong" class="song-maker-prompt-button">Load Song</div>
            </div>
        </div>

        <div class="song-title-container">
            <p id="songTitle"></p>
        </div>

        <div class="song-maker-settings-menu-container">
            <div class="settings-menu-label">
                <p>Song Settings</p>
            </div>
            <div class="setting-song-title">
                <label for="song-title-input">Song Title</label>
                <input type="text" id="song-title-input">
            </div>
            <div class="setting-root-note">
                <label for="root-note-select">Root Note</label>
                <select id="root-note-select">
                    <option>C</option>
                    <option>C#</option>
                    <option>D</option>
                    <option>D#</option>
                    <option>E</option>
                    <option>F</option>
                    <option>F#</option>
                    <option>G</option>
                    <option>G#</option>
                    <option>A</option>
                    <option>A#</option>
                    <option>B</option>
                </select>
            </div>
            <div class="settings-menu-submit">
                <button type="button">Save</button>
            </div>
        </div>

        <div class="song-maker-insert-container"></div>
        
        <script src="js/song.js"></script>
        <script src="js/song_maker.js"></script>
        <script src="js/database.js"></script>
        <script src="js/utils.js"></script>
    </div>
</body>
</html>