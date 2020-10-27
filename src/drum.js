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
    drum_kit.createDrums();

    window.requestAnimationFrame(function(){drum_kit.animateDrums()});

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        drum_kit.drums.forEach(function(drum) {
            if(drum.isInBounds(mouse_x, mouse_y)) {
                drum.play();
            }
        });
    });
}

function DrumKit() {
    this.drums = [];

    this.createDrums = function() {
        this.drums[0] = new Drum("snare", "sound_files/drums/snare.mp3", "image_files/snare.svg", 1150, 650, 200, 200);
        this.drums[1] = new Drum("kick", "sound_files/drums/kick.mp3", "image_files/kick.svg", 750, 500, 350, 300);
        this.drums[2] = new Drum("tom1", "sound_files/drums/tom1.mp3", "image_files/tom.svg", 950, 400, 100, 100);
        this.drums[3] = new Drum("tom2", "sound_files/drums/tom2.mp3", "image_files/tom.svg", 800, 400, 100, 100);
        this.drums[4] = new Drum("hi_hat", "sound_files/drums/hi_hat.mp3", "image_files/cymbal.svg", 550, 650, 150, 150);
        this.drums[5] = new Drum("crash", "sound_files/drums/crash.mp3", "image_files/cymbal.svg", 550, 375, 225, 225);
        this.drums[6] = new Drum("ride",  "sound_files/drums/ride.mp3", "image_files/cymbal.svg", 1050, 375, 225, 225);
    }

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

function Drum(drum_name, sound_src, image_src, center_x, center_y, width, height) {
    this.name = drum_name;
    this.sound = new Audio();
    this.sound.src = sound_src;
    this.img = new Image();
    this.img.src = image_src;
    this.img.width = width;
    this.img.height = height;
    this.arc = {
        x: center_x,
        y: center_y,
        r: this.img.width,
        s_angle: 0,
        e_angle: 2 * Math.PI
    }
    this.is_playing = false;

    this.draw = function() {
        var canvas = document.getElementById("drumCanvas");
        var ctx = canvas.getContext("2d");
        if(this.is_playing) {
            ctx.drawImage(this.img, this.arc.x, this.arc.y, this.img.width * 1.1, this.img.height * 1.1);
        } else {
            ctx.drawImage(this.img, this.arc.x, this.arc.y, this.img.width, this.img.height);
        }
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
        var x_lower = this.arc.x;
        var x_upper = this.arc.x + this.img.width;
        var y_lower = this.arc.y;
        var y_upper = this.arc.y + this.img.height;
        if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
            return true;
        } else {
            return false;
        }
    }
}