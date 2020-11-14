<?php
    $instr_name = $_GET["name"];

    $instr_path = "sounds/".$instr_name."/"; 
    $dir_contents = scandir($instr_path);
    array_shift($dir_contents);
    array_shift($dir_contents);
    
    echo json_encode($dir_contents);
?>