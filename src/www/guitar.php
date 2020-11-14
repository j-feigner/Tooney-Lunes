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
        <div id="guitarBlock" class="canvas-container">
            <img src="../images/guitar_strum_prompt" id="strumPrompt" class="guitar-prompt">
            <canvas id="guitarCanvas"></canvas>

            <script src="js/guitar.js"></script>
            <script src="js/utils.js"></script>
        </div>
    </div>

    <div id="bottomBar" class="bottom-bar">
		<button type="button" id="strumButton" class="menu-button">Strum Guitar</button>
		<button type="button" id="pickButton" class="menu-button">Start Picking</button>
    </div>
</body>
</html>