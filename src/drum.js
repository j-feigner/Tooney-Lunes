window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("drumBlock");
    div.appendChild(canvas);

    canvas.style.border = "1px solid black";

    ctx = canvas.getContext("2d");
}

function DrumKit() {
    this.kick = null;
    this.snare = null;
    this.hi_hat = null;
    this.crash = null;
    this.ride = null;
    this.floor_tom = null;
    this.tom1 = null;
    this.tom2 = null;
}