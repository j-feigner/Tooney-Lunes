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
        <div id="drumBlock" class="canvas-container">
            <canvas id="drumCanvas"></canvas>

            <script src="js/drum.js"></script>
        </div>
    </div>

    <div id="bottomBar" class="bottom-bar">
        <button type="button" id="playButton" class="menu-button">Lay it Down</button>
    </div>
</body>
</html>