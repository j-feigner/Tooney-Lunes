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
        <div class="song-title-container">
            <p id="songTitle"></p>
        </div>

        <div id="addGridButton">
            <img src="images/plus.svg" width="100%">
        </div>
        
        <script src="js/song_maker.js"></script>
        <script src="js/database.js"></script>
        <script src="js/utils.js"></script>
    </div>

    <div id="bottomBar" class="bottom-bar">
        <button type="button" id="playSong" class="menu-button">Play Song</button>
        <button type="button" id="saveSong" class="menu-button">Save Song</button>
        <button type="button" id="loadSong" class="menu-button">Load Song</button>
        <input type="range" id="songTempo" min="60" max="200" step="1" value="120">
        <span id="tempoValue"></span>
    </div>
</body>
</html>