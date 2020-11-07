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
        <div id="pianoBlock" class="canvas-container">
            <canvas id="pianoCanvas"></canvas>

            <script src="js/piano.js"></script>
        </div>
    </div>

    <div id="bottomBar" class="bottom-bar">
        <select id="mode" name="chord-mode">
            <option value="note">Note Mode</option>
            <option value="chord">Chord Mode</option>
        </select>

        <input type="radio" name="chord-degree" id="d1" value="major" checked> Major 
        <input type="radio" name="chord-degree" id="d2" value="minor"> Minor
        <!-- <div class="bottom-menu-div">
            <div id="playMode" class="binary-switch">
                <span class="left-label">Note Mode</span>
                <div class="slider">
                    <div class="knob" id="playModeKnob"></div>
                </div>
                <span class="right-label">Chord Mode</span>
            </div>
        </div> -->
    </div>
</body>
</html>