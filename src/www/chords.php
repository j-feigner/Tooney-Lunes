<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        $header = file_get_contents("html/header.html");
        echo $header;
    ?>
</head>
<body>
    <?php
        $top_bar = file_get_contents("html/top_bar.html");
        echo $top_bar;
    ?>

    <div id="pageContents" class="page-contents">
        <div id="chordContainer" class="canvas-container">
            <span>CHORD I</span>
            <span>CHORD II</span>
            <span>CHORD III</span>
            <span>CHORD IV</span>

            <script src="js/chords.js"></script>
            <script src="js/utils.js"></script>
        </div>
    </div>

    <div id="bottomBar" class="bottom-bar">
    <button type="button" id="loopChords" class="menu-button">Start</button>
        <input type="range" id="songTempo" min="60" max="200" step="1" value="120">
        <span id="tempoValue"></span>
    </div>
</body>
</html>