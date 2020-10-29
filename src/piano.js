window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("pianoBlock");
    div.appendChild(canvas);
    canvas.id = "pianoCanvas";
    canvas.style.border = "1px solid black";
    canvas.width = window.innerWidth;
    canvas.height = 800;

    var piano = new Piano(50, 50, 800, 200);
    piano.createKeys();
    piano.draw();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        piano.keys.forEach(function(key) {
            if(key.isClicked(mouse_x, mouse_y)) {
                key.play();
            }
        })
    })
}

function Piano(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.keys = [];

    this.white_keys = [];
    this.black_keys = [];

    this.white_key_width = this.w / 22;
    this.black_key_width = this.white_key_width / 2;

    this.createSounds = function() {
        var instrument = "piano";
        var piano_srcs = [
			"sound_files/" + instrument + "/C_3.mp3",
			"sound_files/" + instrument + "/Cs_3.mp3",
			"sound_files/" + instrument + "/D_3.mp3",
			"sound_files/" + instrument + "/Ds_3.mp3",
			"sound_files/" + instrument + "/E_3.mp3",
			"sound_files/" + instrument + "/F_3.mp3",
			"sound_files/" + instrument + "/Fs_3.mp3",
			"sound_files/" + instrument + "/G_3.mp3",
			"sound_files/" + instrument + "/Gs_3.mp3",
			"sound_files/" + instrument + "/A_3.mp3",
			"sound_files/" + instrument + "/As_3.mp3",
			"sound_files/" + instrument + "/B_3.mp3",
			"sound_files/" + instrument + "/C_4.mp3",
			"sound_files/" + instrument + "/Cs_4.mp3",
			"sound_files/" + instrument + "/D_4.mp3",
			"sound_files/" + instrument + "/Ds_4.mp3",
			"sound_files/" + instrument + "/E_4.mp3",
			"sound_files/" + instrument + "/F_4.mp3",
			"sound_files/" + instrument + "/Fs_4.mp3",
			"sound_files/" + instrument + "/G_4.mp3",
			"sound_files/" + instrument + "/Gs_4.mp3",
			"sound_files/" + instrument + "/A_4.mp3",
			"sound_files/" + instrument + "/As_4.mp3",
			"sound_files/" + instrument + "/B_4.mp3",
			"sound_files/" + instrument + "/C_5.mp3",
			"sound_files/" + instrument + "/Cs_5.mp3",
			"sound_files/" + instrument + "/D_5.mp3",
			"sound_files/" + instrument + "/Ds_5.mp3",
			"sound_files/" + instrument + "/E_5.mp3",
			"sound_files/" + instrument + "/F_5.mp3",
			"sound_files/" + instrument + "/Fs_5.mp3",
			"sound_files/" + instrument + "/G_5.mp3",
			"sound_files/" + instrument + "/Gs_5.mp3",
			"sound_files/" + instrument + "/A_5.mp3",
			"sound_files/" + instrument + "/As_5.mp3",
			"sound_files/" + instrument + "/B_5.mp3",
			"sound_files/" + instrument + "/C_6.mp3"
        ];
        var sounds = [];
		for(var i = 0; i < piano_srcs.length; i++) {
			var sound = new Audio(piano_srcs[i]);
			sounds.push(sound);
		}
        return sounds;
    }
    this.sounds = this.createSounds();

    this.createWhiteKeys = function() {
        var key_counter = 0;
        for(var i = 0; i < this.sounds.length; i++) {    
            // Check if current key is white or black and assigns css class
            if(!( i == 1  || 
                i == 3  ||
                i == 6  || 
                i == 8  || 
                i == 10 ||
                i == 13 ||
                i == 15 ||
                i == 18 ||
                i == 20 ||
                i == 22 ||
                i == 25 ||
                i == 27 ||
                i == 30 ||
                i == 32 ||
                i == 34)) {
                var key = new WhiteKey(this.x + this.white_key_width * key_counter, this.y, this.white_key_width, this.h, this.sounds[i]);
                this.white_keys.push(key);
                key_counter++;
            }
        }    
    }

    this.createBlackKeys = function() {
        var key_counter = 0;
        for(var i = 0; i < this.sounds.length; i++) {    
            // Check if current key is white or black and assigns css class
            if(!( i == 1  || 
                i == 3  ||
                i == 6  || 
                i == 8  || 
                i == 10 ||
                i == 13 ||
                i == 15 ||
                i == 18 ||
                i == 20 ||
                i == 22 ||
                i == 25 ||
                i == 27 ||
                i == 30 ||
                i == 32 ||
                i == 34)) {
                var key = new BlackKey(this.x + this.black_key_width * key_counter, this.y, this.white_key_width, this.h / 1.5, this.sounds[i]);
                this.black_keys.push(key);
                key_counter++;
            }
        }  
    }

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

        this.keys[12] = new WhiteKey("left", this.x + this.white_key_width * 7, this.y, this.white_key_width, this.h, this.sounds[0]);
        this.keys[13] = new BlackKey(this.keys[0].upper_rect.x + this.keys[0].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[1]);
        this.keys[14] = new WhiteKey("middle", this.x + this.white_key_width * 8, this.y, this.white_key_width, this.h, this.sounds[2]);
        this.keys[15] = new BlackKey(this.keys[2].upper_rect.x + this.keys[2].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[3]);
        this.keys[16] = new WhiteKey("right", this.x + this.white_key_width * 9, this.y, this.white_key_width, this.h, this.sounds[4]);
        this.keys[17] = new WhiteKey("left", this.x + this.white_key_width * 10, this.y, this.white_key_width, this.h, this.sounds[5]);
        this.keys[18] = new BlackKey(this.keys[5].upper_rect.x + this.keys[5].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[6]);
        this.keys[19] = new WhiteKey("middle", this.x + this.white_key_width * 11, this.y, this.white_key_width, this.h, this.sounds[7]);
        this.keys[20] = new BlackKey(this.keys[7].upper_rect.x + this.keys[7].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[8]);
        this.keys[21] = new WhiteKey("middle", this.x + this.white_key_width * 12, this.y, this.white_key_width, this.h, this.sounds[9]);
        this.keys[22] = new BlackKey(this.keys[9].upper_rect.x + this.keys[9].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[10]);
        this.keys[23] = new WhiteKey("right", this.x + this.white_key_width * 13, this.y, this.white_key_width, this.h, this.sounds[11]);

        this.keys[24] = new WhiteKey("left", this.x, this.y, this.white_key_width, this.h, this.sounds[0]);
        this.keys[25] = new BlackKey(this.keys[0].upper_rect.x + this.keys[0].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[1]);
        this.keys[26] = new WhiteKey("middle", this.x + this.white_key_width, this.y, this.white_key_width, this.h, this.sounds[2]);
        this.keys[27] = new BlackKey(this.keys[2].upper_rect.x + this.keys[2].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[3]);
        this.keys[28] = new WhiteKey("right", this.x + this.white_key_width * 2, this.y, this.white_key_width, this.h, this.sounds[4]);
        this.keys[29] = new WhiteKey("left", this.x + this.white_key_width * 3, this.y, this.white_key_width, this.h, this.sounds[5]);
        this.keys[30] = new BlackKey(this.keys[5].upper_rect.x + this.keys[5].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[6]);
        this.keys[31] = new WhiteKey("middle", this.x + this.white_key_width * 4, this.y, this.white_key_width, this.h, this.sounds[7]);
        this.keys[32] = new BlackKey(this.keys[7].upper_rect.x + this.keys[7].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[8]);
        this.keys[33] = new WhiteKey("middle", this.x + this.white_key_width * 5, this.y, this.white_key_width, this.h, this.sounds[9]);
        this.keys[34] = new BlackKey(this.keys[9].upper_rect.x + this.keys[9].upper_rect.w, this.y, this.black_key_width, this.h / 1.5, this.sounds[10]);
        this.keys[35] = new WhiteKey("right", this.x + this.white_key_width * 6, this.y, this.white_key_width, this.h, this.sounds[11]);
    }

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.closePath();

        this.keys.forEach(function(key) {
            key.draw();
        })

        this.black_keys.forEach(function(key) {
           // key.draw();
        })
    }
}

function WhiteKey(key_type, x, y, width, height, piano_sound) {
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

    this.outer_rect = {
        x: x,
        y: y,
        w: width,
        h: height
    }
    this.upper_rect = {
        x: x + this.upper_offset,
        y: y,
        w: this.upper_width,
        h: height / 1.5
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
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(this.upper_rect.x, this.upper_rect.y, this.upper_rect.w, this.upper_rect.h);
        ctx.rect(this.lower_rect.x, this.lower_rect.y, this.lower_rect.w, this.lower_rect.h);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        this.sound.play();
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

        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        this.sound.play();
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