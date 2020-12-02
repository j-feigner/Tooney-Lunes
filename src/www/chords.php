<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        $header = file_get_contents("html/header.html");
        echo $header;
    ?>
    <link rel="stylesheet" href="css/chords_style.css">
</head>
<body>
    <?php
        $top_bar = file_get_contents("html/tooney_title_top_bar.html");
        echo $top_bar;
    ?>

    <div id="pageContents" class="page-contents">
        <div class="chord-app-container">
            <div class="chords-container">
                <div class="chord-display-container">
                    <span class="chord-label">CHORD I</span>
                    <div class="chord-selection">
                        <select class="chord-root-selection">
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
                        <select class="chord-mode-selection">
                            <option>Major</option>
                            <option>Minor</option>
                        </select>
                    </div>
                </div>
                <div class="chord-display-container">
                    <span class="chord-label">CHORD II</span>
                    <div class="chord-selection">
                        <select class="chord-root-selection">
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
                        <select class="chord-mode-selection">
                            <option>Major</option>
                            <option>Minor</option>
                        </select>
                    </div>
                </div>
                <div class="chord-display-container">
                    <span class="chord-label">CHORD III</span>
                    <div class="chord-selection">
                        <select class="chord-root-selection">
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
                        <select class="chord-mode-selection">
                            <option>Major</option>
                            <option>Minor</option>
                        </select>
                    </div>
                </div>
                <div class="chord-display-container">
                    <span class="chord-label">CHORD IV</span>
                    <div class="chord-selection">
                        <select class="chord-root-selection">
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
                        <select class="chord-mode-selection">
                            <option>Major</option>
                            <option>Minor</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="chords-controls">
                <button type="button" class="start-button">Start</button>
                <div class="tempo-container">
                    <span class="tempo-label">Tempo</span>
                    <input type="range" min="60" max="240" step="1" value="120">
                </div>
            </div>
        </div>
        <script src="js/chords.js"></script>
        <script src="js/utils.js"></script>
    </div>
</body>
</html>