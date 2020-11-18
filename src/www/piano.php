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
        $top_bar = file_get_contents("html/tooney_title_top_bar.html");
        echo $top_bar;
    ?>

    <div id="pageContents" class="page-contents">
        <div id="pianoBlock" class="canvas-container">
            <canvas id="pianoCanvas"></canvas>
            <div id="instrSwitcher">
                <button type="button" id="left" onclick="window.location='drum.php'"><< Drums</button>
                <button type="button" id="right" onclick="window.location='guitar.php'">Guitar >></button>
            </div>
        </div>
    </div>

    <div id="bottomBar" class="bottom-bar">
        <div class="bottom-bar-radio" id="mode">
            <input type="radio" value="note_mode" name="mode" class="radio-input" id="note" checked />
            <label class="radio-label" for="note">Note Mode</label>
            <input type="radio" value="chord_mode" name="mode" class="radio-input" id="chord" />
            <label class="radio-label" for="chord">Chord Mode</label>
        </div>

        <div class="bottom-bar-radio" id="chordDegree">
            <input type="radio" value="major" name="chord-deg" class="radio-input" id="major" checked />
            <label class="radio-label" for="major">Major</label>
            <input type="radio" value="minor" name="chord-deg" class="radio-input" id="minor" />
            <label class="radio-label" for="minor">Minor</label>
        </div>
    </div>

    <script src="js/piano.js"></script>
    <script src="js/utils.js"></script>
</body>
</html>