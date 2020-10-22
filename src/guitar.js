window.onload = main;

function main() {
    var canvas = createCanvas();
    var canvas_context = canvas.getContext("2d");
    
    var sounds = createGuitarSoundArray();

    var is_strumming = false;
    var mouse_x = 0;
    var mouse_y = 0;

    var string1 = new GuitarString(100, 100, 800, 20, sounds, canvas);
    string1.drawString();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;
        if(string1.isStrummed(mouse_x, mouse_y)) {
            string1.pluckString();
        }
    });
}

function GuitarString(rect_x, rect_y, rect_w, rect_h, sounds, canvas) {
    this.rect = {
        x: rect_x,
        y: rect_y,
        width: rect_w,
        height: rect_h
    };
    this.sounds = sounds;
    this.fret = 0;
    this.is_strumming = false;

    this.drawString = function() {
        ctx = canvas.getContext("2d");

        // Draw stroke for string 
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.rect.x, this.rect.y);
        ctx.lineTo(this.rect.x + this.rect.width, this.rect.y);
        ctx.stroke();
        ctx.closePath();

        // Outline bounding rectangle
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        ctx.stroke();
        ctx.closePath();
    };

    this.pluckString = function() {
        var sound = new Audio();
        sound.src = sounds[this.fret].src;
        sound.play();
        delete sound;
    };

    this.isStrummed = function(x, y) {
        var x_lower = this.rect.x;
        var x_upper = this.rect.x + this.rect.width;
        var y_lower = this.rect.y;
        var y_upper = this.rect.y + this.rect.height;
        if(x > x_lower && x < x_upper && y > y_lower && y < y_upper ) {
            return true;
        }
        else {
            return false;
        }
    };
}

function createCanvas() {
    var guitar_block = document.getElementById("guitarBlock");
    var canvas = document.createElement("canvas");
    guitar_block.appendChild(canvas);

    canvas.height = 600;
    canvas.width = 1000;
    canvas.style.border = "1px solid black";

    return canvas;
}

function createGuitarSoundArray() {
    var sound_srcs = [
        "sound_files/guitar/1_0_E3.mp3",
        "sound_files/guitar/2_0_A3.mp3",
        "sound_files/guitar/3_0_D4.mp3",
        "sound_files/guitar/4_0_G4.mp3",
        "sound_files/guitar/5_0_B4.mp3",
        "sound_files/guitar/6_0_E5.mp3"
    ];

    var sounds = [];
    for(var i = 0; i < sound_srcs.length; i++) {
        var sound = new Audio(sound_srcs[i]);
        sounds.push(sound);
    }

    return sounds;
}