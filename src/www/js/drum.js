var url_header = "sounds/drum/";//"https://j-feigner.github.io/Tooney-Lunes/src/sound_files/drums/";

window.onload = main;

function main() {
    var canvas = document.getElementById("drumCanvas");
    resizeCanvas();

    var audio_ctx = new AudioContext();
    var gain_node = audio_ctx.createGain();
    gain_node.connect(audio_ctx.destination);

    var kit_width = canvas.width / 2;
    var kit_height = kit_width / 2;
    
    var drum_kit = new DrumKit(0, 0, kit_width, kit_height);
    drum_kit.createDrums();

    drum_kit.drums.forEach(function(drum) {
        var req = new XMLHttpRequest();
        req.open("GET", drum.sound.src);
        req.responseType = "arraybuffer";
        req.onload = function() {
            var audio_data = req.response;
            audio_ctx.decodeAudioData(audio_data, function(buffer) {
                drum.sound_buffer = buffer;
            });
        }
        req.send();
    });

    window.requestAnimationFrame(function(){drum_kit.animateDrums(canvas)});

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        drum_kit.drums.forEach(function(drum) {
            if(drum.isInBounds(mouse_x, mouse_y)) {
                drum.playBuffer(audio_ctx, 0);
            }
        });
    });

    var play_button = document.getElementById("playButton");
    play_button.addEventListener("click", function() {
        drum_kit.layItDown(audio_ctx);
    })
}

function resizeCanvas() {
    var container = document.getElementById("drumBlock");
    var canvas = document.getElementById("drumCanvas");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}

// DrumKit container object
function DrumKit(x, y, width, height) {
    this.drums = [];

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.center_x = this.x + this.width;
    this.center_y = this.y + (this.height / 2);

    this.loop = null;
    this.is_laying_it_down = false;

    // Fills drums array and sets properties of each drum in the kit
    // Positions and proportions are ratios of the DrumKit bounding box to ensure proper resizing
    this.createDrums = function() {
        this.drums[0] = new Drum("kick", url_header + "kick.mp3", "images/kick.svg", this.center_x - this.width / 3.5 / 2, this.center_y, this.width / 3.5, this.height / 2);
        this.drums[1] = new Drum("snare", url_header + "snare.mp3", "images/snare.svg", this.center_x + this.width / 5.5, this.center_y + this.height / 7, this.width / 6, this.width / 6);
        this.drums[2] = new Drum("tom1", url_header + "tom1.mp3", "images/tom.svg", this.center_x - this.width / 10, this.center_y - this.height / 6, this.width / 10, this.width / 10);
        this.drums[3] = new Drum("tom2", url_header + "tom2.mp3", "images/tom.svg", this.center_x, this.center_y - this.height / 6, this.width / 10, this.width / 10);
        this.drums[4] = new Drum("hi_hat", url_header + "hi_hat.mp3", "images/cymbal.svg", this.center_x - this.width / 3, this.center_y + this.height / 5.5, this.width / 6.5, this.width / 6.5);
        this.drums[5] = new Drum("crash", url_header + "crash.mp3", "images/cymbal.svg", this.center_x - this.width / 3, this.center_y - this.height / 3.5, this.width / 4.5, this.width / 4.5);
        this.drums[6] = new Drum("ride",  url_header + "ride.mp3", "images/cymbal.svg", this.center_x + this.width / 10, this.center_y - this.height / 3.5, this.width / 4.5, this.width / 4.5);
    }

    // Callback function for requestAnimationFrame, draws each drum in the kit
    this.animateDrums = function(c) {
        canvas = c;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drums.forEach(function(drum) {
            drum.draw(c);
        });
        window.requestAnimationFrame(() => this.animateDrums(c));
    }

    // Silly function to play a groove rock backing beat
    this.layItDown = function(audio_ctx) {
        var bpm = 105;
        var s_per_beat = 60 / bpm;
        
        var measure = s_per_beat * 4;
        var half_note = s_per_beat * 2;
        var quarter_note = s_per_beat;
        var eighth_note = s_per_beat / 2;
        var sixteenth_note = s_per_beat / 4;

        this.drums[2].playBuffer(audio_ctx, measure - quarter_note);
        this.drums[2].playBuffer(audio_ctx, measure - eighth_note - sixteenth_note);
        this.drums[3].playBuffer(audio_ctx, measure - eighth_note);
        this.drums[3].playBuffer(audio_ctx, measure - sixteenth_note);
        this.drums[5].playBuffer(audio_ctx, measure);

        for(var i = 1; i <= 4; i++) {
            this.drums[0].playBuffer(audio_ctx, measure * i);
            this.drums[0].playBuffer(audio_ctx, measure * i + eighth_note + sixteenth_note);
            this.drums[0].playBuffer(audio_ctx, measure * i + quarter_note + eighth_note + sixteenth_note);
            this.drums[0].playBuffer(audio_ctx, measure * i + half_note + eighth_note);
    
            this.drums[1].playBuffer(audio_ctx, measure * i + quarter_note);
            this.drums[1].playBuffer(audio_ctx, measure * i + half_note + quarter_note);
    
            this.drums[4].playBuffer(audio_ctx, measure * i);
            this.drums[4].playBuffer(audio_ctx, measure * i + eighth_note);
            this.drums[4].playBuffer(audio_ctx, measure * i + quarter_note);
            this.drums[4].playBuffer(audio_ctx, measure * i + quarter_note + eighth_note);
            this.drums[4].playBuffer(audio_ctx, measure * i + half_note);
            this.drums[4].playBuffer(audio_ctx, measure * i + half_note + eighth_note);
            this.drums[4].playBuffer(audio_ctx, measure * i + half_note + quarter_note);
            this.drums[4].playBuffer(audio_ctx, measure * i + half_note + quarter_note + eighth_note);
        }
    }
}

// Drum object. Contains an Audio and Image object as well as position data
function Drum(drum_name, sound_src, image_src, x, y, width, height) {
    this.name = drum_name;

    this.sound = new Audio();
    this.sound.src = sound_src;
    this.sound.crossOrigin = "";

    this.sound_buffer = null;

    this.img = new Image();
    this.img.src = image_src;
    this.rect = {
        x: x,
        y: y,
        w: width,
        h: height
    }

    this.is_playing = false;
    this.hit_intensity = 2;

    // Renders this drum to the canvas
    this.draw = function(c) {
        var canvas = c;
        var ctx = canvas.getContext("2d");
        if(this.is_playing) {
            var center_x = this.rect.x + (this.rect.w / 2);
            var center_y = this.rect.y + (this.rect.h / 2);

            var new_width = this.rect.w + this.hit_intensity * Math.sin(Date.now());
            var new_height = this.rect.h + this.hit_intensity * Math.cos(Date.now());

            var new_x = center_x - (new_width / 2);
            var new_y = center_y - (new_height / 2);

            ctx.drawImage(this.img, new_x, new_y, new_width, new_height);
        } else {
            ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        }
    }

    // Plays sounds and sets play flag variable for 100ms
    this.play = function() {
        var play_sound = new Audio();
        play_sound.src = this.sound.src;
        play_sound.play();
        delete play_sound;

        this.is_playing = true;
        setTimeout( () => {
            this.is_playing = false;
        }, 200);
    }

    this.playBuffer = function(audio_ctx, delay) {
        var source = audio_ctx.createBufferSource();
        source.buffer = this.sound_buffer;
        source.connect(audio_ctx.destination);
        source.start(audio_ctx.currentTime + delay);

        setTimeout(() => {
            this.is_playing = true;
            setTimeout(() => {
                this.is_playing = false;
            }, 200);
        }, delay * 1000);
    }

    // Checks if a given x,y pair is within rectangular bounding box
    this.isInBounds = function(x, y) {
        var x_lower = this.rect.x;
        var x_upper = this.rect.x + this.rect.w;
        var y_lower = this.rect.y;
        var y_upper = this.rect.y + this.rect.h;
        if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
            return true;
        } else {
            return false;
        }
    }
}