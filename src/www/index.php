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
        <div class="screen-message-container">
            <div class="screen-message-contents">
                <h1>WELCOME TO TOONEY LUNES</h1>
                <h3>Play instruments, make songs, and share your creations.</h3>
                <p>Designed by Brian Corbett, Jordan Feigner, Matthew Nicholson, and James Pelligra</p>
                <p>2020</p>
            </div>
        </div>
    </div>
</body>
</html>