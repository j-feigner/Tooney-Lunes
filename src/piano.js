//var url_header = "https://j-feigner.github.io/Tooney-Lunes/sound_files/piano";
var url_header = "sound_files/piano"

window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("pianoBlock");
    div.appendChild(canvas);
    canvas.id = "pianoCanvas";
    canvas.style.border = "1px solid black";
    canvas.width = 1600;
    canvas.height = 400;

    var piano_width = canvas.width / 1.1;
    var piano_height = canvas.height / 1.3;
    var x_offset = canvas.width / 2 - piano_width / 2;
    var y_offset = canvas.height / 2 - piano_height / 2;

    var piano = new Piano(x_offset, y_offset, piano_width, piano_height);
    piano.createKeys();
    piano.draw();

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

function Piano(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.keys = [];

    this.white_key_width = this.w / 21;
    this.black_key_width = this.white_key_width / 2;

    this.play_mode = "note";

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
        this.keys[0] = new WhiteKey("left", this.x + this.white_key_width * 0, this.y, this.white_key_width, this.h, this.sounds[0]);
        this.keys[1] = new BlackKey(this.keys[0].upper_rect.x + this.keys[0].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[1]);
        this.keys[2] = new WhiteKey("middle", this.x + this.white_key_width * 1, this.y, this.white_key_width, this.h, this.sounds[2]);
        this.keys[3] = new BlackKey(this.keys[2].upper_rect.x + this.keys[2].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[3]);
        this.keys[4] = new WhiteKey("right", this.x + this.white_key_width * 2, this.y, this.white_key_width, this.h, this.sounds[4]);
        this.keys[5] = new WhiteKey("left", this.x + this.white_key_width * 3, this.y, this.white_key_width, this.h, this.sounds[5]);
        this.keys[6] = new BlackKey(this.keys[5].upper_rect.x + this.keys[5].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[6]);
        this.keys[7] = new WhiteKey("middle", this.x + this.white_key_width * 4, this.y, this.white_key_width, this.h, this.sounds[7]);
        this.keys[8] = new BlackKey(this.keys[7].upper_rect.x + this.keys[7].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[8]);
        this.keys[9] = new WhiteKey("middle", this.x + this.white_key_width * 5, this.y, this.white_key_width, this.h, this.sounds[9]);
        this.keys[10] = new BlackKey(this.keys[9].upper_rect.x + this.keys[9].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[10]);
        this.keys[11] = new WhiteKey("right", this.x + this.white_key_width * 6, this.y, this.white_key_width, this.h, this.sounds[11]);

        this.keys[12] = new WhiteKey("left", this.x + this.white_key_width * 7, this.y, this.white_key_width, this.h, this.sounds[12]);
        this.keys[13] = new BlackKey(this.keys[12].upper_rect.x + this.keys[12].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[13]);
        this.keys[14] = new WhiteKey("middle", this.x + this.white_key_width * 8, this.y, this.white_key_width, this.h, this.sounds[14]);
        this.keys[15] = new BlackKey(this.keys[14].upper_rect.x + this.keys[14].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[15]);
        this.keys[16] = new WhiteKey("right", this.x + this.white_key_width * 9, this.y, this.white_key_width, this.h, this.sounds[16]);
        this.keys[17] = new WhiteKey("left", this.x + this.white_key_width * 10, this.y, this.white_key_width, this.h, this.sounds[17]);
        this.keys[18] = new BlackKey(this.keys[17].upper_rect.x + this.keys[17].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[18]);
        this.keys[19] = new WhiteKey("middle", this.x + this.white_key_width * 11, this.y, this.white_key_width, this.h, this.sounds[19]);
        this.keys[20] = new BlackKey(this.keys[19].upper_rect.x + this.keys[19].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[20]);
        this.keys[21] = new WhiteKey("middle", this.x + this.white_key_width * 12, this.y, this.white_key_width, this.h, this.sounds[21]);
        this.keys[22] = new BlackKey(this.keys[21].upper_rect.x + this.keys[21].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[22]);
        this.keys[23] = new WhiteKey("right", this.x + this.white_key_width * 13, this.y, this.white_key_width, this.h, this.sounds[23]);

        this.keys[24] = new WhiteKey("left", this.x + this.white_key_width * 14, this.y, this.white_key_width, this.h, this.sounds[24]);
        this.keys[25] = new BlackKey(this.keys[24].upper_rect.x + this.keys[24].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[25]);
        this.keys[26] = new WhiteKey("middle", this.x + this.white_key_width * 15, this.y, this.white_key_width, this.h, this.sounds[26]);
        this.keys[27] = new BlackKey(this.keys[26].upper_rect.x + this.keys[26].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[27]);
        this.keys[28] = new WhiteKey("right", this.x + this.white_key_width * 16, this.y, this.white_key_width, this.h, this.sounds[28]);
        this.keys[29] = new WhiteKey("left", this.x + this.white_key_width * 17, this.y, this.white_key_width, this.h, this.sounds[29]);
        this.keys[30] = new BlackKey(this.keys[29].upper_rect.x + this.keys[29].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[30]);
        this.keys[31] = new WhiteKey("middle", this.x + this.white_key_width * 18, this.y, this.white_key_width, this.h, this.sounds[31]);
        this.keys[32] = new BlackKey(this.keys[31].upper_rect.x + this.keys[31].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[32]);
        this.keys[33] = new WhiteKey("middle", this.x + this.white_key_width * 19, this.y, this.white_key_width, this.h, this.sounds[33]);
        this.keys[34] = new BlackKey(this.keys[33].upper_rect.x + this.keys[33].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[34]);
        this.keys[35] = new WhiteKey("right", this.x + this.white_key_width * 20, this.y, this.white_key_width, this.h, this.sounds[35]);
    }

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.clearRect(0, 0, c.width, c.height);

        this.keys.forEach(function(key) {
            key.draw();
        });

        window.requestAnimationFrame(() => {
            this.draw();
        })
    }

    this.playNote = function(key) {
        key.play();
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
        x: x + this.upper_offset + 0.5,
        y: y + 0.5,
        w: this.upper_width - 0.5,
        h: (height / 1.5) - 0.5
    }
    this.lower_rect = {
        x: x + 0.5,
        y: y + this.upper_rect.h + 0.5,
        w: width - 0.5,
        h: height - this.upper_rect.h - 0.5
    }

    this.sound = piano_sound;

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
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
        x: x + 0.5,
        y: y + 0.5,
        w: width - 0.5,
        h: height - 0.5
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
        ctx.lineWidth = 1;
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