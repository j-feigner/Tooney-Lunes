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
    this.string_width = canvas.width - 100;
    this.string_height = 20;
    this.string_offset = 50;
    this.strum_delay = 25;
    this.is_strumming = false;

    this.createStrings = function() {
        for(var i = 0; i < 6; i++) {
            this.strings[i] = new GuitarString(this.string_offset, 
                                          300 + this.string_offset * i,
                                          this.string_width,
                                          this.string_height,
                                          sounds[i],
                                          canvas);
        }
    };

    this.drawFretboard = function() {

    };

    this.draw = function() {
        this.createStrings();
        for(var i = 0; i < this.strings.length; i++) {
            this.strings[i].drawString();
        }
    };

    this.strum = function() {
        for(var i = 0; i < this.strings.length; i++) {
            this.strumDelay(i);
        }
    };

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
        ctx.lineWidth = this.rect.height / 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
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