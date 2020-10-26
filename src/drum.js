window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("drumBlock");
    div.appendChild(canvas);

    canvas.style.border = "1px solid black";

    ctx = canvas.getContext("2d");
}