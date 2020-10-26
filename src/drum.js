window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("drumBlock");
    div.appendChild(canvas);
    canvas.id = "drumCanvas";
    canvas.style.border = "1px solid black";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var drum_kit = new DrumKit();
    drum_kit.snare = new Drum("sound_files/drums/snare.mp3", 100, 100, 25);
    drum_kit.snare.draw();
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
        s_angle: 0,
        e_angle: 2 * Math.PI
    }

    this.draw = function() {
        var canvas = document.getElementById("drumCanvas");
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.arc.x, this.arc.y, this.arc.r, this.arc.s_angle, this.arc.e_angle);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
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