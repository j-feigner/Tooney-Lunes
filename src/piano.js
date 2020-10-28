window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("pianoBlock");
    div.appendChild(canvas);
    canvas.id = "pianoCanvas";
    canvas.style.border = "1px solid black";
    canvas.width = window.innerWidth;
    canvas.height = 800;
}

function Piano(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.keys = [];
}

function WhiteKey() {
    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;

    this.sound = new Audio();
}

function BlackKey() {
    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;

    this.sound = new Audio();
}