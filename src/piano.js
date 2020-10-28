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
    piano.createWhiteKeys();
    piano.draw();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        piano.keys.forEach(function(key) {
            if(key.isInBounds(mouse_x, mouse_y)) {
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
        
    }

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.closePath();

        this.white_keys.forEach(function(key) {
            if(key.type === "white") {
                key.draw();
            }
        })
    }
}

function WhiteKey(x, y, width, height, piano_sound) {
    this.type = "white";
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.sound = piano_sound;

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        this.sound.play();
    }

    this.isInBounds = function(x, y) {
        var x_lower = this.x
        var x_upper = this.x + this.w;
        var y_lower = this.y;
        var y_upper = this.y + this.h;
        if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
            return true;
        } else {
            return false;
        }
    }
}

function BlackKey(x, y, width, height, piano_sound) {
    this.type = "black";
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.sound = piano_sound;

    this.draw = function() {
        var c = document.getElementById("pianoCanvas");
        var ctx = c.getContext("2d");

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.closePath();
    }

    this.play = function() {
        this.sound.play();
    }

    this.isInBounds = function(x, y) {
        var x_lower = this.x
        var x_upper = this.x + this.w;
        var y_lower = this.y;
        var y_upper = this.y + this.h;
        if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
            return true;
        } else {
            return false;
        }
    }
}