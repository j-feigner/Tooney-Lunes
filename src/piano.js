//var url_header = "https://j-feigner.github.io/Tooney-Lunes/sound_files/piano";
var url_header = "sound_files/piano"

window.onload = main;

function main() {
    var canvas = document.getElementById("pianoCanvas");
    resizeCanvas();

    var piano_width = canvas.width;
    var piano_height = canvas.height;
    var x_offset = canvas.width / 2 - piano_width / 2;
    var y_offset = canvas.height / 2 - piano_height / 2;

    var piano = new Piano(0, 0, piano_width, piano_height);
    piano.createKeys();
    piano.draw();
    piano.update();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        piano.keys.forEach(function(key, key_index) {
            if(key.isClicked(mouse_x, mouse_y)) {
                if(piano.play_mode === "note") {
                    piano.playNote(key);
                }
                if(piano.play_mode === "chord") {
                    piano.playChord(key_index);
                }
            }
        })
    });

    var mode = document.getElementById("mode");
    mode.addEventListener("change", function() {
        piano.play_mode = mode.value;
    });
}

function resizeCanvas() {
    var container = document.getElementById("pianoBlock");
    var canvas = document.getElementById("pianoCanvas");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}

function Piano(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.white_key_count = 21;
    this.keys = [];

    this.line_width = 10;

    this.play_mode = "note";

    this.c = document.getElementById("pianoCanvas");
    this.ctx = this.c.getContext("2d");

    this.createSounds = function() {
        var piano_srcs = [
			url_header + "/C_3.mp3",
			url_header + "/Cs_3.mp3",
			url_header + "/D_3.mp3",
			url_header + "/Ds_3.mp3",
			url_header + "/E_3.mp3",
			url_header + "/F_3.mp3",
			url_header + "/Fs_3.mp3",
			url_header + "/G_3.mp3",
			url_header + "/Gs_3.mp3",
			url_header + "/A_3.mp3",
			url_header + "/As_3.mp3",
			url_header + "/B_3.mp3",
			url_header + "/C_4.mp3",
			url_header + "/Cs_4.mp3",
			url_header + "/D_4.mp3",
			url_header + "/Ds_4.mp3",
			url_header + "/E_4.mp3",
			url_header + "/F_4.mp3",
			url_header + "/Fs_4.mp3",
			url_header + "/G_4.mp3",
			url_header + "/Gs_4.mp3",
			url_header + "/A_4.mp3",
			url_header + "/As_4.mp3",
			url_header + "/B_4.mp3",
			url_header + "/C_5.mp3",
			url_header + "/Cs_5.mp3",
			url_header + "/D_5.mp3",
			url_header + "/Ds_5.mp3",
			url_header + "/E_5.mp3",
			url_header + "/F_5.mp3",
			url_header + "/Fs_5.mp3",
            url_header + "/G_5.mp3",
            url_header + "/Gs_5.mp3",
            url_header + "/A_5.mp3",
            url_header + "/As_5.mp3",
            url_header + "/B_5.mp3",
            url_header + "/C_6.mp3"
        ];
        var sounds = [];
		for(var i = 0; i < piano_srcs.length; i++) {
			var sound = new Audio(piano_srcs[i]);
			sounds.push(sound);
		}
        return sounds;
    }
    this.sounds = this.createSounds();

    this.createKeys = function() {
        var white_key_width = (this.w / 21);
        var white_key_height = this.h - (this.line_width / 2) - 0.5;
    
        var black_key_width = white_key_width / 2;
        var black_key_height = (this.h / 1.5) - (this.line_width);

        var white_left_keys = [0, 5, 12, 17, 24, 29];
        var white_middle_keys = [2, 7, 9, 14, 19, 21, 26, 31, 33];
        var white_right_keys = [4, 11, 16, 23, 28, 35];
        var black_keys = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27, 30, 32, 34];

        var white_key_counter = 0;

        for(var i = 0; i < 36; i++) {
            if(black_keys.includes(i)) {
                this.keys[i] = new BlackKey(this.keys[i - 1].upper_rect.x + this.keys[i - 1].upper_rect.w + (this.line_width / 2),
                                            this.y, 
                                            black_key_width,
                                            black_key_height,
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
                                            this.x + (white_key_width * white_key_counter), 
                                            this.y, 
                                            white_key_width, 
                                            white_key_height, 
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

    this.playNote = function(key) {
        key.play();
    }

    this.update = function() {
        this.keys.forEach(function(key) {
            if(key.is_playing) {
                key.draw();
            }
        });
        window.requestAnimationFrame(() => this.update());
    }

    this.playChord = function(key_index) {
        var root_key, third_key, fifth_key;
        var degree_selection = document.querySelector("input[name=chord-degree]:checked").value;
    
        root_key = this.keys[key_index]
    
        if(degree_selection == "minor") {
            third_key = this.keys[key_index + 3];
        }
        else {
            third_key = this.keys[key_index + 4];
        }
    
        fifth_key = this.keys[key_index + 7];
        
        root_key.play();
        third_key.play();
        fifth_key.play();
    }
}

function WhiteKey(key_type, x, y, width, height, piano_sound) {
    this.type = "white";
    this.is_playing = false;
    this.white_key_type = key_type;

    this.upper_offset = (() => {
        if(this.white_key_type === "left") {
            return 0;
        }
        if(this.white_key_type === "middle") {
            return width / 4;
        }
        if(this.white_key_type === "right"){
            return width / 4;
        }   
    })();

    this.upper_width = (() => {
        if(this.white_key_type === "left" || this.white_key_type === "right") {
            return width * 0.75;
        }
        if(this.white_key_type === "middle") {
            return width * 0.5
        }
    })();

    this.upper_rect = {
        x: x + this.upper_offset,
        y: y,
        w: this.upper_width,
        h: (height / 1.5)
    }
    this.lower_rect = {
        x: x,
        y: y + this.upper_rect.h,
        w: width,
        h: height - this.upper_rect.h
    }

    this.sound = piano_sound;

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        if(this.is_playing) {
            ctx.fillStyle = "grey";
        }
        else {
            ctx.fillStyle = "white";
        }
        ctx.beginPath();
        ctx.rect(this.upper_rect.x, this.upper_rect.y, this.upper_rect.w, this.upper_rect.h);
        ctx.rect(this.lower_rect.x, this.lower_rect.y, this.lower_rect.w, this.lower_rect.h);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        this.is_playing = true;
        setTimeout(() => {
            this.is_playing = false;
        }, 300);

        var sound_clip = new Audio();
        sound_clip.src = this.sound.src;
        sound_clip.play();
        delete sound_clip;
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

function BlackKey(x, y, width, height, piano_sound) {
    this.type = "black";
    this.is_playing = false;
    this.rect = {
        x: x,
        y: y,
        w: width,
        h: height
    }

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
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        this.is_playing = true;
        setTimeout(() => {
            this.is_playing = false;
        }, 300);

        var sound_clip = new Audio();
        sound_clip.src = this.sound.src;
        sound_clip.play();
        delete sound_clip;
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

function isInBounds(x, y, rect) {
    var x_lower = rect.x
    var x_upper = rect.x + rect.w;
    var y_lower = rect.y;
    var y_upper = rect.y + rect.h;
    if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
        return true;
    } else {
        return false;
    }
}