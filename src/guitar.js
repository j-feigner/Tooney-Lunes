window.onload = main;

function main() {
    var canvas = createCanvas();

    var guitar = new Guitar(canvas);
    guitar.draw();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;
        guitar.fretString(mouse_x, mouse_y);
        guitar.draw();
    });
    canvas.addEventListener("mousedown", function() {
        if(!guitar.is_strumming) {
            guitar.is_strumming = true;
        }
    });
    canvas.addEventListener("mousemove", function(event) {
        if(guitar.is_strumming) {
            var mouse_x = event.offsetX;
            var mouse_y = event.offsetY;
            guitar.strings.forEach(function(string) {
                if(string.isStrummed(mouse_x, mouse_y)) {
                    string.pluck();
                }
            });
            guitar.draw();
        }
    });
    canvas.addEventListener("mouseup", function() {
        if(guitar.is_strumming) {
            guitar.is_strumming = false;
        }
    });
}

function Guitar(canvas) {
    this.sounds = createGuitarSoundArray();

    this.number_of_strings = 6;
    this.number_of_frets = 19;

    this.neck_length = canvas.width / 1.1;
    this.neck_width = this.neck_length / 5;

    this.fretboard_rect = {
        x: canvas.width / 2 - this.neck_length / 2,
        y: canvas.height / 3 - this.neck_width / 2,
        width: this.neck_length,
        height: this.neck_width
    };

    this.strum_delay = 250;
    this.is_strumming = false;

    // Returns an array of Guitar String objects created based on fretboard dimensions
    this.createStrings = function() {
        var strings = [];
        for(var i = 0; i < this.number_of_strings; i++) {
            strings[i] = new GuitarString(
                this.fretboard_rect.x, 
                this.fretboard_rect.y + 
                    (this.fretboard_rect.height * 0.92) - 
                    (i * this.fretboard_rect.height / (this.number_of_strings - 1) * 0.92),
                this.fretboard_rect.width,
                this.fretboard_rect.height / 12,
                this.sounds[i],
                canvas
            );
        }
        return strings;
    };
    this.strings = this.createStrings();

    // Returns a two dimensional array of fret bounding boxes that overlays the fretboard
    // For frets[i][j], i represents the string number, and j the fret number
    this.createFrets = function() {
        var frets = [];
        for(var i = 0; i < this.number_of_strings; i++) {
            var string = [];
            for(var j = 0; j < this.number_of_frets + 1; j++) {
                string[j] = {
                    x: this.fretboard_rect.width / this.number_of_frets * j,
                    y: this.fretboard_rect.y + 
                       (this.fretboard_rect.height * 0.92) - 
                       (i * this.fretboard_rect.height / (this.number_of_strings - 1) * 0.92),
                    width: this.fretboard_rect.width / this.number_of_frets,
                    height: this.fretboard_rect.height / 12
                };
            }
            frets[i] = string;
        }
        return frets;
    };
    this.frets = this.createFrets();

    // Renders fretboard background and fret lines to the canvas
    this.drawFretboard = function() {
        var ctx = canvas.getContext("2d");

        // Draw fretboard background
        ctx.fillStyle = "rgb(75, 60, 60)";
        ctx.fillRect(this.fretboard_rect.x, this.fretboard_rect.y, this.fretboard_rect.width, this.fretboard_rect.height);

        // Draw individual frets
        ctx.strokeStyle = "silver";
        ctx.lineWidth = this.fretboard_rect.width / 300;
        ctx.lineCap = "round";
        ctx.beginPath();
        for(var i = 0; i < this.number_of_frets + 1; i++) {
            ctx.moveTo(this.fretboard_rect.x + (this.fretboard_rect.width / this.number_of_frets * i), this.fretboard_rect.y);
            ctx.lineTo(this.fretboard_rect.x + (this.fretboard_rect.width / this.number_of_frets * i), this.fretboard_rect.y + this.fretboard_rect.height);
            ctx.stroke();
        }
        ctx.closePath();
    };

    // Renders red "fretted" markers over the strings to display to the user
    // what fret each string is currently assigned
    this.drawFrettedSymbols = function() {
        var ctx = canvas.getContext("2d");

        this.strings.forEach(function(string) {
            var fret_number = string.current_fret;
            var fret_width = this.fretboard_rect.width / this.number_of_frets;
            var fret_x = (fret_width * fret_number) + (fret_width / 2);
            var fret_y = string.string_rect.y + (string.string_rect.height / 2);

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(fret_x, fret_y, string.string_rect.height / 2.5, 0, 360);
            ctx.fill();
            ctx.closePath();
        }.bind(this));
    };

    // Creates and draws all approoriate guitar elements to the canvas
    this.draw = function() {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.drawFretboard();
        for(var i = 0; i < this.strings.length; i++) {
            this.strings[i].drawString();
        }
        this.drawFrettedSymbols();
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

    // Checks each fret bounding box against the given x,y pair
    // Frets the appropriate string if there is a hit
    this.fretString = function(x, y) {
        for(var i = 0; i < this.frets.length; i++) {
            for(var j = 0; j < this.frets[i].length; j++) {
                if(isInBounds(x, y, this.frets[i][j])) {
                    this.strings[i].current_fret = j;
                }
            }
        }
    };
}

// A GuitarString object consists of a rectangular bounding box for registering click events,
// and an array of sounds the string is capable of producing. This sound produced by the string changes
// depending on the fret value.
function GuitarString(rect_x, rect_y, rect_w, rect_h, sounds, canvas) {
    this.string_rect = {
        x: rect_x,
        y: rect_y,
        width: rect_w,
        height: rect_h
    };
    this.sounds = sounds;
    this.current_fret = 0;
    this.is_playing = false;
    this.play_delay = 300;

    // Renders the string to the canvas
    this.drawString = function() {
        var ctx = canvas.getContext("2d");

        // Draw stroke for string visual
        if(this.is_playing) {
            ctx.lineWidth = (this.string_rect.height / 3) + 2 * (Math.sin(0.1 * Date.now()));
        }
        else {
            ctx.lineWidth = (this.string_rect.height) / 3;
        }
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.string_rect.x, this.string_rect.y + this.string_rect.height / 2);
        ctx.lineTo(this.string_rect.x + this.string_rect.width, this.string_rect.y + this.string_rect.height / 2);
        ctx.stroke();
        ctx.closePath();

        // Outline for rectangular bounding box 
        /*
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.string_rect.x, this.string_rect.y, this.string_rect.width, this.string_rect.height);
        ctx.stroke();
        ctx.closePath();
        */
    };

    // Plays string audio based on current fret value
    this.pluck = function() {
        if(!this.is_playing) {
            var sound = new Audio();        // Play note
            sound.src = sounds[this.current_fret];
            sound.play();
            delete sound;

            this.is_playing = true;         // Delay click sensitivity
            setTimeout(function() {
                this.is_playing = false;
            }.bind(this), this.play_delay);
        }
    };

    // Boolean function to determine if a given x,y pair is within the string's bounding box
    this.isStrummed = function(x, y) {
        return isInBounds(x, y, this.string_rect);
    };
}

// Creates canvas elemtn in script too enable IntelliSense in VS Code, can be moved to main() later
function createCanvas() {
    var guitar_block = document.getElementById("guitarBlock");
    var canvas = document.createElement("canvas");
    guitar_block.appendChild(canvas);

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
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

// Determines whether a given x,y pair is within the bounds of a given rectangle
// Expectes rect object to be in format {x: , y: , width: , height: }
function isInBounds(x, y, rect) {
    var x_lower = rect.x;
    var x_upper = rect.x + rect.width;
    var y_lower = rect.y;
    var y_upper = rect.y + rect.height;
    if(x > x_lower && x < x_upper && y > y_lower && y < y_upper ) {
        return true;
    }
    else {
        return false;
    }
}