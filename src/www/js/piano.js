//var url_header = "https://j-feigner.github.io/Tooney-Lunes/sound_files/piano";
var url_header = "sounds/piano_alt"

window.onload = main;

function main() {
    var canvas = document.getElementById("pianoCanvas");
    resizeCanvas("pianoCanvas", "pianoBlock");

    var audio_ctx = new AudioContext();

    var piano_width = canvas.width * 0.95;
    var piano_height = canvas.height * 0.55;

    var x = (canvas.width - piano_width) / 2;
    var y = 50;

    var piano = new Piano(x, y, piano_width, piano_height);
    piano.start();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        piano.keys.forEach(function(key, key_index) {
            if(key.isClicked(mouse_x, mouse_y)) {
                if(piano.play_mode === "note") {
                    piano.playNote(key, audio_ctx);
                }
                if(piano.play_mode === "chord") {
                    piano.playChord(key_index, audio_ctx);
                }
            }
        })
    });

    var note = document.getElementById("note");
    var mode = document.getElementById("mode");
    mode.addEventListener("click", function () {
        if (note.checked)
            piano.play_mode = "note";
        else
            piano.play_mode = "chord";
    });
}

function Piano(x, y, width, height) {
    this.sounds = [];

    this.line_width =  10;
    this.border = this.line_width / 2;
    
    this.x = Math.floor(x) + this.border;
    this.y = Math.floor(y) + this.border;
    this.w = Math.floor(width) - this.line_width;
    this.h = Math.floor(height) - this.line_width;

    this.white_key_count = 21;
    this.white_key_width = Math.floor(this.w / this.white_key_count);
    this.white_key_height = this.h;

    this.black_key_width = this.white_key_width / 2;
    this.black_key_height = Math.floor(this.white_key_height * 2 / 3) - this.border;

    this.keys = [];

    this.play_mode = "note";

    this.c = document.getElementById("pianoCanvas");
    this.ctx = this.c.getContext("2d");

    this.createKeys = () => {
        var white_left_keys = [0, 5, 12, 17, 24, 29];
        var white_middle_keys = [2, 7, 9, 14, 19, 21, 26, 31, 33];
        var white_right_keys = [4, 11, 16, 23, 28, 35];
        var black_keys = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27, 30, 32, 34];

        var white_key_counter = 0;
        for(var i = 0; i < 36; i++) {
            if(black_keys.includes(i)) {
                this.keys[i] = new BlackKey(this.keys[i - 1].upper_rect_right_boundary + this.border,
                                            this.y, 
                                            this.black_key_width - this.border,
                                            this.black_key_height,
                                            this.line_width,
                                            this.sounds[i]
                                            );
            }
            else {
                var white_key_type = null;
                if(white_left_keys.includes(i)) {
                    white_key_type = "left";
                } 
                else if(white_middle_keys.includes(i)) {
                    white_key_type = "middle";
                }
                else if(white_right_keys.includes(i)) {
                    white_key_type = "right";
                }
                this.keys[i] = new WhiteKey(white_key_type, 
                                            this.x + (this.white_key_width * white_key_counter) + this.border, 
                                            this.y, 
                                            this.white_key_width, 
                                            this.white_key_height, 
                                            this.line_width,
                                            this.sounds[i]
                                            );
                white_key_counter++;
            }
        }
    }

    this.draw = function() {
        this.keys.forEach(function(key) {
            key.draw();
        });
    }

    this.playNote = function(key, ctx) {
        key.play(ctx);
    }

    this.update = function() {
        this.keys.forEach(function(key) {
            if(key.is_playing) {
                key.draw();
            }
        });
        window.requestAnimationFrame(() => this.update());
    }

    this.playChord = function(key_index, ctx) {
        var root_key, third_key, fifth_key;
        var degree_selection = document.getElementById("chordDegree");
    
        root_key = this.keys[key_index]
    
        for (var i = 0; i < degree_selection.childNodes.length; i++) {
            if (degree_selection.childNodes[i].checked) {
                if (degree_selection.childNodes[i].value == "minor")
                    third_key = this.keys[key_index + 3];
                else
                    third_key = this.keys[key_index + 4];
            }
        }
    
        fifth_key = this.keys[key_index + 7];
        
        root_key.play(ctx);
        third_key.play(ctx);
        fifth_key.play(ctx);
    }

    this.start = function() {
        loadInstrument("piano", this.sounds, this.initialize);
    }

    this.initialize = () => {
        this.createKeys();
        this.draw();
        this.update();
    }
}

function WhiteKey(key_type, x, y, width, height, line_width, piano_sound) {
    this.type = "white";
    this.is_playing = false;
    this.white_key_type = key_type;

    this.line_width = line_width;
    this.border = line_width / 2;

    this.black_key_width = (width / 2);

    this.upper_width = (() => {
        if(this.white_key_type === "left" || this.white_key_type === "right") {
            return width - (this.black_key_width / 2);
        }
        if(this.white_key_type === "middle") {
            return width - this.black_key_width;
        }
    })();

    this.upper_offset = (() => {
        if(this.white_key_type === "left") {
            return 0;
        }
        if(this.white_key_type === "middle") {
            return this.black_key_width / 2;
        } 
        if(this.white_key_type === "right") {
            return width - this.upper_width;
        }
    })();

    this.upper_rect = {
        x: x + this.upper_offset,
        y: y,
        w: this.upper_width - this.border,
        h: Math.floor(height * 2 / 3)
    }
    this.upper_rect_right_boundary = this.upper_rect.x + this.upper_width - this.border;
    this.lower_rect = {
        x: x,
        y: y + this.upper_rect.h,
        w: width - this.border,
        h: height - this.upper_rect.h
    }

    this.line_width = line_width;

    this.sound = piano_sound;

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.strokeStyle = "black";
        ctx.lineWidth = this.line_width;
        ctx.lineCap = "round";
        if(this.is_playing) {
            ctx.fillStyle = "grey";
        } else {
            ctx.fillStyle = "white";
        }
        ctx.beginPath();
        ctx.rect(this.upper_rect.x, this.upper_rect.y, this.upper_rect.w, this.upper_rect.h);
        ctx.rect(this.lower_rect.x, this.lower_rect.y, this.lower_rect.w, this.lower_rect.h);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    this.play = function(ctx) {
        var source = ctx.createBufferSource();
        source.buffer = this.sound;
        source.connect(ctx.destination);
        source.start();

        this.is_playing = true;
        setTimeout(() => {
            this.is_playing = false;
            this.draw();
        }, 300);
    }

    this.isClicked = function(x, y) {
        if(isInBounds(x, y, this.upper_rect) || isInBounds(x, y, this.lower_rect)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function BlackKey(x, y, width, height, line_width, piano_sound) {
    this.type = "black";
    this.is_playing = false;
    this.is_finished = false;
    this.rect = {
        x: x,
        y: y,
        w: width,
        h: height
    }

    this.line_width = line_width;

    this.sound = piano_sound;

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        if(this.is_playing) {
            ctx.fillStyle = "grey";
        }
        else {
            ctx.fillStyle = "black";
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = this.line_width;
        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    this.play = function(ctx) {
        var source = ctx.createBufferSource();
        source.buffer = this.sound;
        source.connect(ctx.destination);
        source.start();

        this.is_playing = true;
        setTimeout(() => {
            this.is_playing = false;
            this.draw();
        }, 300);
    }

    this.isClicked = function(x, y) {
        if(isInBounds(x, y, this.rect)) {
            return true;
        }
        else {
            return false;
        }
    }
}