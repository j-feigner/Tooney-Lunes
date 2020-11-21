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
        <div id="addGridButton">
            <img src="images/plus.svg" width="100%">
        </div>
        
        <script src="js\song_maker.js"></script>
        <script src="js\utils.js"></script>
    </div>

    <div id="bottomBar" class="bottom-bar">
        <button type="button" id="playSong" class="menu-button">Play Song</button>
        <input type="range" id="songTempo" min="60" max="200" step="1" value="120">
        <span id="tempoValue"></span>
    </div>
</body>
</html>