window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("drumBlock");
    div.appendChild(canvas);
    canvas.id = "drumCanvas";
    canvas.style.border = "1px solid black";
    canvas.width = window.innerWidth;
    canvas.height = 800;

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

    var button = document.getElementById("playLoop");
    button.addEventListener("click", function() {
        drum_kit.layItDown();
        if(drum_kit.is_laying_it_down) {
            button.value = "Stop Laying that Down!";
        } else {
            button.value = "Lay it Down";
        }
    });
}

// DrumKit container object
function DrumKit() {
    this.drums = [];
    this.x = 400;
    this.y = 200;
    this.width = 1000;
    this.height = this.width / 2;

    this.center_x = this.x + this.width / 2;
    this.center_y = this.y + this.height / 2;

    this.loop = null;
    this.is_laying_it_down = false;

    // Fills drums array and sets properties of each drum in the kit
    // Positions and proportions are ratios of the DrumKit bounding box to ensure proper resizing
    this.createDrums = function() {
        this.drums[0] = new Drum("kick", "sound_files/drums/kick.mp3", "image_files/kick.svg", this.center_x - this.width / 3.5 / 2, this.center_y, this.width / 3.5, this.height / 2);
        this.drums[1] = new Drum("snare", "sound_files/drums/snare.mp3", "image_files/snare.svg", this.center_x + this.width / 5.5, this.center_y + this.height / 7, this.width / 6, this.width / 6);
        this.drums[2] = new Drum("tom1", "sound_files/drums/tom1.mp3", "image_files/tom.svg", this.center_x - this.width / 10, this.center_y - this.height / 6, this.width / 10, this.width / 10);
        this.drums[3] = new Drum("tom2", "sound_files/drums/tom2.mp3", "image_files/tom.svg", this.center_x, this.center_y - this.height / 6, this.width / 10, this.width / 10);
        this.drums[4] = new Drum("hi_hat", "sound_files/drums/hi_hat.mp3", "image_files/cymbal.svg", this.center_x - this.width / 3, this.center_y + this.height / 5.5, this.width / 6.5, this.width / 6.5);
        this.drums[5] = new Drum("crash", "sound_files/drums/crash.mp3", "image_files/cymbal.svg", this.center_x - this.width / 3, this.center_y - this.height / 3.5, this.width / 4.5, this.width / 4.5);
        this.drums[6] = new Drum("ride",  "sound_files/drums/ride.mp3", "image_files/cymbal.svg", this.center_x + this.width / 10, this.center_y - this.height / 3.5, this.width / 4.5, this.width / 4.5);
    }

    // Callback function for requestAnimationFrame, draws each drum in the kit
    this.animateDrums = function() {
        canvas = document.getElementById("drumCanvas");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drums.forEach(function(drum) {
            drum.draw();
        });
        window.requestAnimationFrame(() => this.animateDrums());
    }

    // Silly function to play a groove rock backing beat
    this.layItDown = function() {
        var interval = 2500;
        var quarter = interval / 4;
        var eighth = interval / 8;
        var sixteenth = interval / 16;
        if(this.is_laying_it_down) {
            this.is_laying_it_down = false;
            clearInterval(this.loop);
        } else {
            this.is_laying_it_down = true;
            // Intro
            setTimeout(() => {
                this.drums[2].play();
            }, interval - quarter);
            setTimeout(() => {
                this.drums[2].play();
            }, interval - eighth - sixteenth);
            setTimeout(() => {
                this.drums[3].play();
            }, interval - eighth);
            setTimeout(() => {
                this.drums[3].play();
            }, interval - sixteenth);
            setTimeout(() => {
                this.drums[5].play();
            }, interval);
            // Main groove rock loop
            this.loop = setInterval(() => {
                setTimeout(() => {
                    this.drums[0].play();
                    this.drums[4].play();
                }, 0);
                setTimeout(() => {
                    this.drums[4].play();
                }, eighth);
                setTimeout(() => {
                    this.drums[0].play();
                }, sixteenth * 3);
                setTimeout(() => {
                    this.drums[1].play()
                    this.drums[4].play();
                }, quarter);
                setTimeout(() => {
                    this.drums[4].play();
                }, quarter + eighth);
                setTimeout(() => {
                    this.drums[0].play(); 
                }, quarter + eighth + sixteenth);
                setTimeout(() => {
                    this.drums[4].play();
                }, quarter * 2);
                setTimeout(() => {
                    this.drums[0].play(); 
                    this.drums[4].play();
                }, quarter * 2 + eighth);
                setTimeout(() => {
                    this.drums[1].play();
                    this.drums[4].play();
                }, quarter * 3);
                setTimeout(() => {
                    this.drums[4].play();
                }, quarter * 3 + eighth);
            }, interval);
        }
    }
}

// Drum object. Contains an Audio and Image object as well as position data
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

    // Renders this drum to the canvas
    this.draw = function() {
        var canvas = document.getElementById("drumCanvas");
        var ctx = canvas.getContext("2d");
        if(this.is_playing) {
            ctx.drawImage(this.img, this.arc.x, this.arc.y, this.img.width + 3 * Math.sin(Date.now()), this.img.height + 3 * Math.cos(Date.now()));
        } else {
            ctx.drawImage(this.img, this.arc.x, this.arc.y, this.img.width, this.img.height);
        }
    }

    // Plays sounds and sets play flag variable for 100ms
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

    // Checks if a given x,y pair is within rectangular bounding box
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