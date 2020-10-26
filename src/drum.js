window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("drumBlock");
    div.appendChild(canvas);
    canvas.id = "drumCanvas";
    canvas.style.border = "1px solid black";
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

function Drum(sound_src, center_x, center_y, radius) {
    this.sound = new Audio();
    this.sound.src = sound_src;
    this.arc = {
        x: center_x,
        y: center_y,
        r: radius,
        sAngle: 0,
        eAngle: 2 * Math.PI
    }

    this.isInBounds = function(x, y) {
        var coord_radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if(coord_radius <= this.arc.r) {
            return true;
        } else {
            return false;
        }
    }
}