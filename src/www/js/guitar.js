window.onload = main;

function main() {
    var canvas = document.getElementById("guitarCanvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    resizeCanvas("guitarCanvas", "guitarBlock");

    var container = document.getElementById("guitarBlock");
    container.style.backgroundImage = "url('../images/guitar_lite.svg')";
    container.style.backgroundSize = "90%";
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPosition = "center center";

    var audio_ctx = new AudioContext();

    var guitar = new Guitar(canvas, audio_ctx);
    guitar.sounds = createGuitarSoundArray(audio_ctx);
    guitar.strings = guitar.createStrings();
    guitar.frets = guitar.createFrets();
    guitar.draw();
    guitar.update();

    var strum_prompt = document.getElementById("strumPrompt");

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;
        guitar.fretString(mouse_x, mouse_y);
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
        }
    });
    canvas.addEventListener("mouseup", function() {
        if(guitar.is_strumming) {
            if(strum_prompt.style.opacity != "0.0") {
                strum_prompt.style.animationName = "fade-out";
                strum_prompt.style.animationDuration = "1s";
                strum_prompt.style.animationIterationCount = "1";
            }
            guitar.is_strumming = false;
        }
    });

    var pick_button = document.getElementById("pickButton");
    pick_button.addEventListener("click", function() {
        guitar.pick();
        if(guitar.is_picking) {
            pick_button.innerHTML = "Stop Picking";
        }
        else {
            pick_button.innerHTML = "Start Picking";
        }
    });

    var strum_button = document.getElementById("strumButton");
    strum_button.addEventListener("click", function() {
        guitar.strum();
    });
}

// Main guitar object
function Guitar(canvas, audio_ctx) {
    this.sounds = [];
    this.strings = [];

    this.number_of_strings = 6;
    this.number_of_frets = 19;

    this.neck_length = canvas.width * 0.9;
    this.neck_width = this.neck_length * 0.1;

    this.outer_rect = {
        x: (canvas.width - this.neck_length) / 2,
        y: (canvas.height - this.neck_width) / 2,
        w: this.neck_length,
        h: this.neck_width
    };

    this.fretboard_rect = {
        x: this.outer_rect.x,
        y: this.outer_rect.y,
        w: this.outer_rect.w * 0.755,
        h: this.outer_rect.h
    };

    this.fret_width = this.fretboard_rect.w / this.number_of_frets;
    this.fret_height = this.fretboard_rect.h / this.number_of_strings;

    this.string_width = 10;

    this.strum_delay = 25;

    this.drawing_interval = null;
    this.picking_interval = null;

    this.is_strumming = false;
    this.is_picking = false;

    // Returns an array of Guitar String objects created based on fretboard dimensions
    this.createStrings = function() {
        var strings = [];
        for(var i = 0; i < this.number_of_strings; i++) {
            strings[i] = new GuitarString(
                this.outer_rect.x, 
                this.outer_rect.y + this.outer_rect.h - (i * this.fret_height) - (this.fret_height / 2) - (this.string_width / 2),
                this.outer_rect.w,
                this.string_width,
                this.fret_width,
                this.sounds[i],
                canvas,
                audio_ctx
            );
        }
        return strings;
    };

    // Returns a two dimensional array of fret bounding boxes that overlays the fretboard
    // For frets[i][j], i represents the string number, and j the fret number
    this.createFrets = function() {
        var frets = [];
        for(var i = 0; i < this.number_of_strings; i++) {
            var string = [];
            for(var j = 0; j < this.number_of_frets; j++) {
                string[j] = {
                    x: this.fretboard_rect.x + (this.fret_width * j) + 1,
                    y: this.fretboard_rect.y + 
                       this.fretboard_rect.h - 
                       (i * this.fret_height) -
                       this.fret_height,
                    w: this.fret_width,
                    h: this.fret_height
                };
            }
            frets[i] = string;
        }
        return frets;
    };

    // Renders all relevant rectangles to screen for testing
    this.drawHitboxes = function(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.lineWidth = 4;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.outer_rect.x, this.outer_rect.y, this.outer_rect.w, this.outer_rect.h);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.rect(this.fretboard_rect.x, this.fretboard_rect.y, this.fretboard_rect.w, this.fretboard_rect.h);
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        this.frets.forEach((string) => {
            string.forEach((fret) => {
                ctx.rect(fret.x, fret.y, fret.w, fret.h);
            })
        })
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        this.strings.forEach((string) => {
            ctx.rect(string.rect.x, string.rect.y, string.rect.w, string.rect.h);
        })
        ctx.stroke();
        ctx.closePath();
    };

    // Renders red "fretted" markers over the strings to display to the user
    // what fret each string is currently assigned
    this.drawFrettedSymbols = function() {
        var ctx = canvas.getContext("2d");

        this.strings.forEach((string) => {
            if(string.current_fret != 0) {
                var fret_x = this.outer_rect.x + (this.fret_width * (string.current_fret - 1)) + (this.fret_width / 2);
                var fret_y = string.rect.y + (string.rect.h / 2);
                var radius = this.string_width;

                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.arc(fret_x, fret_y, radius, 0, 360);
                ctx.fill();
                ctx.closePath();
            }
        });
    };

    this.draw = function() {
        this.strings.forEach((string) => {
            string.drawString();
        })
    }

    // Creates and draws all approoriate guitar elements to the canvas
    this.update = function() {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.strings.forEach((string) => {
            string.drawString();
        })
        this.drawFrettedSymbols();

        window.requestAnimationFrame(() => this.update());
    };

    // Plucks all strings of the guitar with a given delay
    this.strum = function() {
        for(var i = 0; i < this.strings.length; i++) {
            this.strumDelay(i);
        }
    };

    // Helper function for Guitar.strum() to allow for delay between each sring pluck
    this.strumDelay = function(i) {
        setTimeout(() => {
            this.strings[i].pluck();
        }, this.strum_delay * i);
    };

    // Checks each fret bounding box against the given x,y pair
    // Frets the appropriate string if there is a hit
    this.fretString = function(x, y) {
        for(var i = 0; i < this.frets.length; i++) {
            for(var j = 0; j < this.frets[i].length; j++) {
                if(isInBounds(x, y, this.frets[i][j])) {
                    if(this.strings[i].current_fret == j + 1) {
                        this.strings[i].current_fret = 0;
                    }
                    else {
                        this.strings[i].current_fret = j + 1;
                    }
                }
            }
        }
    };

    // Starts or stops a picking pattern modeled on Travis picking at a fixed tempo
    this.pick = function() {
        if(this.is_picking) {
            this.is_picking = false;
            clearInterval(this.picking_interval);
            clearInterval(this.drawing_interval);
        }
        else{
            this.is_picking = true;

            this.drawing_interval = setInterval( () => {
                this.draw();
            }, 20);

            this.picking_interval = setInterval( () => {    // SetInterval sets the entire pattern delay
                setTimeout(() => {                         // SetTimeout sets the individual note delays within the pattern
                    this.strings[0].pluck();
                }, 0);
                setTimeout(() => {
                    this.strings[4].pluck();
                }, 250);
                setTimeout(() => {
                    this.strings[2].pluck();
                }, 500);
                setTimeout(() => {
                    this.strings[3].pluck();
                }, 750);
            }, 1000);
        }
    };
}

// A GuitarString object consists of a rectangular bounding box for registering click events,
// and an array of sounds the string is capable of producing. This sound produced by the string changes
// depending on the fret value.
function GuitarString(rect_x, rect_y, rect_w, rect_h, fret_width, sounds, canvas, audio_ctx) {
    this.rect = {
        x: rect_x,
        y: rect_y,
        w: rect_w,
        h: rect_h
    };
    this.string_width = this.rect.h / 2;
    this.pluck_strength = 1;

    this.sounds = sounds;
    this.current_fret = 0;
    this.is_playing = false;
    this.play_delay = 380;

    // Renders the string to the canvas
    this.drawString = function() {
        var ctx = canvas.getContext("2d");

        ctx.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

        // Draw stroke for string visual
        if(this.is_playing) {
            ctx.lineWidth = this.string_width + this.pluck_strength * (Math.sin(0.1 * Date.now()));
        }
        else {
            ctx.lineWidth = this.string_width;
        }
        ctx.strokeStyle = "white";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.rect.x, this.rect.y + (this.rect.h / 2));
        ctx.lineTo(this.rect.x + this.rect.w, this.rect.y + (this.rect.h / 2));
        ctx.stroke();
        ctx.closePath();
    };

    // Plays string audio based on current fret value
    this.pluck = function() {
        if(!this.is_playing) {
            this.is_playing = true;  

            // Play sound through audio context
            var source = audio_ctx.createBufferSource();
            source.buffer = this.sounds[this.current_fret];
            source.connect(audio_ctx.destination);
            source.start();

           // Delay click sensitivity
            setTimeout(() => {
                this.is_playing = false;
            }, this.play_delay);
        }
    };

    // Boolean function to determine if a given x,y pair is within the string's bounding box
    this.isStrummed = function(x, y) {
        return isInBounds(x, y, this.rect);
    };
}

// Creates initial array of guitar sound sources from source files
function createGuitarSoundArray(audio_ctx) {
    var sound_srcs = [
        [   // String 1
            "sounds/guitar/1_0_E3.mp3",    // String 1, Fret 0
            "sounds/guitar/1_1_F3.mp3",    // String 1, Fret 1
            "sounds/guitar/1_2_Fs3.mp3",   // ...
            "sounds/guitar/1_3_G3.mp3",
            "sounds/guitar/1_4_Gs3.mp3"
        ],
        [   // String 2
            "sounds/guitar/2_0_A3.mp3",
            "sounds/guitar/2_1_As3.mp3",
            "sounds/guitar/2_2_B3.mp3",
            "sounds/guitar/2_3_C4.mp3",
            "sounds/guitar/2_4_Cs4.mp3"
        ],
        [   // String 3
            "sounds/guitar/3_0_D4.mp3",
            "sounds/guitar/3_1_Ds4.mp3",
            "sounds/guitar/3_2_E4.mp3",
            "sounds/guitar/3_3_F4.mp3",
            "sounds/guitar/3_4_Fs4.mp3"
        ],
        [   // String 4
            "sounds/guitar/4_0_G4.mp3",
            "sounds/guitar/4_1_Gs4.mp3",
            "sounds/guitar/4_2_A4.mp3",
            "sounds/guitar/4_3_As4.mp3",
            "sounds/guitar/4_4_B4.mp3"
        ],
        [   // String 5
            "sounds/guitar/5_0_B4.mp3",
            "sounds/guitar/5_1_C5.mp3",
            "sounds/guitar/5_2_Cs5.mp3",
            "sounds/guitar/5_3_D5.mp3",
            "sounds/guitar/5_4_Ds5.mp3"
        ],
        [   // String 6
            "sounds/guitar/6_0_E5.mp3",
            "sounds/guitar/6_1_F5.mp3",
            "sounds/guitar/6_2_Fs5.mp3",   // ...
            "sounds/guitar/6_3_G5.mp3",    // String 6, Fret 3
            "sounds/guitar/6_4_Gs5.mp3"    // String 6, Fret 4
        ]
    ];

    var buffers = [];
    
    // Asynchronously requests sound source files from server
    // and processes them into audio buffers for use with AudioContext()
    sound_srcs.forEach((string, index) => {
        var string_buffers = [];

        string.forEach((note, index) => {
            var req = new XMLHttpRequest();
            req.open("GET", note);
            req.responseType = "arraybuffer";
            req.onload = function() {
                var audio_data = req.response;
                audio_ctx.decodeAudioData(audio_data, function(buffer) {
                    string_buffers[index] = buffer;
                });
            }
            req.send();
        })

        buffers[index] = string_buffers;
    })

    return buffers;
}