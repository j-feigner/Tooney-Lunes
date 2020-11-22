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

        <div id="addGridButton">
            <img src="images/plus.svg" width="100%">
        </div> 
        
        <script src="js/song.js"></script>
        <script src="js/song_maker.js"></script>
        <script src="js/database.js"></script>
        <script src="js/utils.js"></script>
    </div>
</body>
</html>