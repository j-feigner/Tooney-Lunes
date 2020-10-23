window.onload = main;

function main() {
    var canvas = createCanvas();
    
    var sounds = createGuitarSoundArray();

    var guitar = new Guitar(sounds, canvas);
    guitar.draw();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;
        guitar.strings.forEach(function(string) {
            if(string.isStrummed(mouse_x, mouse_y)) {
                string.pluck();
            }
        });
    });

    document.addEventListener("keydown", function(event){
        if(event.key == "Enter") {
            guitar.strum();
        }
    });
}

function Guitar(sounds, canvas) {
    this.sounds = sounds;
    this.strings = [];

    // Fretboard properties
    this.fretboard = {
        x: 100,
        y: 100,
        width: 600,
        height: 270
    };

    // String properties
    this.string_height = this.fretboard_height / 50;
    this.string_width = this.fretboard_width;
    this.string_gap = 30;
    this.string_offset = this.string_height * 4;

    // Strum properties
    this.strum_delay = 25;
    this.is_strumming = false;

    // Initializes array of GuitarString objects, called in Guitar.draw()
    this.createStrings = function() {
        for(var i = 0; i < 6; i++) {
            this.strings[i] = new GuitarString(
                100, 
                50 * i + 100,
                600,
                20,
                sounds[i],
                canvas
            );
        }
    };

    this.drawFretboard = function() {
        ctx = canvas.getContext("2d");
        // Draw fretboard background
        ctx.fillStyle = "rgb(75, 60, 60)";
        ctx.fillRect(this.fretboard.x, this.fretboard.y, this.fretboard.width, this.fretboard.height);
        // Draw individual frets
        ctx.strokeStyle = "silver";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100, 370);
        ctx.moveTo(200, 100);
        ctx.lineTo(200, 370);
        ctx.moveTo(300, 100);
        ctx.lineTo(300, 370);
        ctx.moveTo(400, 100);
        ctx.lineTo(400, 370);
        ctx.moveTo(500, 100);
        ctx.lineTo(500, 370);
        ctx.moveTo(600, 100);
        ctx.lineTo(600, 370);
        ctx.moveTo(700, 100);
        ctx.lineTo(700, 370);
        ctx.stroke();
        ctx.closePath();

    };

    // Creates and draws all approoriate guitar elements to the canvas
    this.draw = function() {
        this.createStrings();

        this.drawFretboard();
        for(var i = 0; i < this.strings.length; i++) {
            this.strings[i].drawString();
        }
    };

    // Plucks all strings of the guitar with a given delay
    this.strum = function() {
        for(var i = 0; i < this.strings.length; i++) {
            this.strumDelay(i);
        }
    };

    // Helper function for Guitar.strum() to allow for delay between each sring pluck
    this.strumDelay = function(i) {
        setTimeout(function() {
            this.strings[i].pluck();
        }.bind(this), this.strum_delay * i);
    };
}

// A GuitarString object consists of a rectangular bounding box for registering click events,
// and an array of sounds the string is capable of producing. This sound produced by the string changes
// depending on the fret value.
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

    // Renders the string to the canvas
    this.drawString = function() {
        ctx = canvas.getContext("2d");

        // Draw stroke for string visual
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.rect.x, this.rect.y + this.rect.height / 2);
        ctx.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height / 2);
        ctx.stroke();
        ctx.closePath();

        // Outline for rectangular bounding box 
        /*
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        ctx.stroke();
        ctx.closePath();
        */
    };

    // Plays string audio based on current fret value
    this.pluck = function() {
        var sound = new Audio();
        sound.src = sounds[this.fret];
        sound.play();
        delete sound;
    };

    // Boolean function to determine if a given x,y pair is within the string's bounding box
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

// Creates canvas elemtn in script too enable IntelliSense in VS Code, can be moved to main() later
function createCanvas() {
    var guitar_block = document.getElementById("guitarBlock");
    var canvas = document.createElement("canvas");
    guitar_block.appendChild(canvas);

    canvas.height = window.innerHeight - 50;
    canvas.width = window.innerWidth - 50;
    canvas.style.border = "1px solid black";

    return canvas;
}

// Creates initial array of guitar sound sources from source files
function createGuitarSoundArray() {
    var sound_srcs = [
        [   // String 1
            "sound_files/guitar/1_0_E3.mp3",    // String 1, Fret 0
            "sound_files/guitar/1_1_F3.mp3",    // String 1, Fret 1
            "sound_files/guitar/1_2_Fs3.mp3",   // ...
            "sound_files/guitar/1_3_G3.mp3",
            "sound_files/guitar/1_4_Gs3.mp3"
        ],
        [   // String 2
            "sound_files/guitar/2_0_A3.mp3",
            "sound_files/guitar/2_1_As3.mp3",
            "sound_files/guitar/2_2_B3.mp3",
            "sound_files/guitar/2_3_C4.mp3",
            "sound_files/guitar/2_4_Cs4.mp3"
        ],
        [   // String 3
            "sound_files/guitar/3_0_D4.mp3",
            "sound_files/guitar/3_1_Ds4.mp3",
            "sound_files/guitar/3_2_E4.mp3",
            "sound_files/guitar/3_3_F4.mp3",
            "sound_files/guitar/3_4_Fs4.mp3"
        ],
        [   // String 4
            "sound_files/guitar/4_0_G4.mp3",
            "sound_files/guitar/4_1_Gs4.mp3",
            "sound_files/guitar/4_2_A4.mp3",
            "sound_files/guitar/4_3_As4.mp3",
            "sound_files/guitar/4_4_B4.mp3"
        ],
        [   // String 5
            "sound_files/guitar/5_0_B4.mp3",
            "sound_files/guitar/5_1_C5.mp3",
            "sound_files/guitar/5_2_Cs5.mp3",
            "sound_files/guitar/5_3_D5.mp3",
            "sound_files/guitar/5_4_Ds5.mp3"
        ],
        [   // String 6
            "sound_files/guitar/6_0_E5.mp3",
            "sound_files/guitar/6_1_F5.mp3",
            "sound_files/guitar/6_2_Fs5.mp3",   // ...
            "sound_files/guitar/6_3_G5.mp3",    // String 6, Fret 3
            "sound_files/guitar/6_4_Gs5.mp3"    // String 6, Fret 4
        ]
    ];

    return sound_srcs;
}