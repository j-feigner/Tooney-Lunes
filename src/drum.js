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
    drum_kit.drums[0] = new Drum("snare", "sound_files/drums/snare.mp3", 100, 100, 25);
    window.requestAnimationFrame(function() {drum_kit.animateDrums()});

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        if(drum_kit.drums[0].isInBounds(mouse_x, mouse_y)) {
            drum_kit.drums[0].play();
        }
    });
}

function DrumKit() {
    this.drums = [];

    this.animateDrums = function() {
        canvas = document.getElementById("drumCanvas");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drums.forEach(function(drum) {
            drum.draw();
        });
        window.requestAnimationFrame(() => this.animateDrums());
    }
}

function Drum(drum_name, sound_src, center_x, center_y, radius) {
    this.name = drum_name;
    this.sound = new Audio();
    this.sound.src = sound_src;
    this.arc = {
        x: center_x,
        y: center_y,
        r: radius,
        s_angle: 0,
        e_angle: 2 * Math.PI
    }
    this.is_playing = false;

    this.draw = function() {
        var canvas = document.getElementById("drumCanvas");
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();

        if(this.is_playing) {
            var radius = this.arc.r * 1.2;
        } else {
            var radius = this.arc.r;
        }
        ctx.arc(this.arc.x, this.arc.y, radius, this.arc.s_angle, this.arc.e_angle);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        var play_sound = new Audio();
        play_sound.src = this.sound.src;
        play_sound.play();
        delete play_sound;

        this.is_playing = true;
        setTimeout( () => {
            this.is_playing = false;
        }, 100);
    }

    this.isInBounds = function(x, y) {
        var coord_radius = Math.sqrt(Math.pow(x - this.arc.x, 2) + Math.pow(y - this.arc.y, 2));
        if(coord_radius <= this.arc.r) {
            return true;
        } else {
            return false;
        }
    }
}