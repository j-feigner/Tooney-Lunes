var url_header = "https://j-feigner.github.io/Tooney-Lunes/src/";

window.onload = main;

function main() {
    var canvas = document.createElement("canvas");
    var div = document.getElementById("container");
    div.appendChild(canvas);
    canvas.id = "canvas";
    canvas.style.border = "1px solid black";
    canvas.width = 1800;
    canvas.height = 400;

    var num_cols = 32;
    var column_width = canvas.width / num_cols;
    var row_height = column_width / 1.5;

    var grid = new Grid(0, 0, canvas.width, canvas.height, num_cols, column_width, row_height);

    var audio_ctx = new AudioContext();

    grid.sound_srcs.forEach(function(src, i) {
        var req = new XMLHttpRequest();
        req.open("GET", url_header + src);
        req.responseType = "arraybuffer";
        req.onload = function() {
            var audio_data = req.response;
            audio_ctx.decodeAudioData(audio_data, function(buffer) {
                grid.audio_buffers[i] = buffer;
            });
        }
        req.send();
    })

    grid.createColumns();
    grid.draw();

    var song = new Song();

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        for(var i = 0; i < grid.columns.length; i++) {
            for(var j = 0; j < grid.columns[i].cells.length; j++) {
                var cell = grid.columns[i].cells[j];
                if(isInBounds(mouse_x, mouse_y, cell.rect)) {
                    cell.is_filled = !cell.is_filled;
                    if(cell.is_filled) {
                        cell.play();
                    }
                    cell.draw();
                    song.readGrid(grid);
                }
            }
        }
    });

    var play_button = document.getElementById("playSong");
    play_button.addEventListener("click", function() {
        grid.playSong(song, audio_ctx);
    });
}

function Grid(x, y, width, height, num_cols, col_width, row_height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height; 

    this.columns = [];
    this.column_number = num_cols;
    this.column_width = col_width;
    this.row_height = row_height;

    this.createSoundSources = function() {
        var srcs = [];
        srcs[0] = "sound_files/drums/kick.mp3";
        srcs[1] = "sound_files/drums/snare.mp3";
        srcs[2] = "sound_files/drums/tom1.mp3";
        srcs[3] = "sound_files/drums/tom2.mp3";
        srcs[4] = "sound_files/drums/hi_hat.mp3";
        srcs[5] = "sound_files/drums/crash.mp3";
        srcs[6] = "sound_files/drums/ride.mp3";
        return srcs;
    }
    this.sound_srcs = this.createSoundSources();

    this.audio_buffers = [];

    this.createColumns = function() {
        for(var i = 0; i < this.column_number; i++) {
            this.columns[i] = new Column(this.x + this.column_width * i, this.y, this.column_width, this.row_height, this.sound_srcs, this.audio_buffers);
            this.columns[i].fillCells();
        }
    }

    this.draw = function() {
        for(var i = 0; i < this.columns.length; i++) {
            for(var j = 0; j < this.columns[i].cells.length; j++) {
                this.columns[i].cells[j].draw();
            }
        }
    }

    this.playSong = function(song, ctx) {
        var bpm = song.tempo;
        var s_per_beat = 60 / bpm;
    
        song.beats.forEach(function(beat, beat_index) {
            var delay = s_per_beat * beat_index;

            var column = this.columns[beat_index];

/*             setTimeout(function() {
                loopHelper(column, s_per_beat);
            }, delay * 1000); */

            setTimeout(() => {
                column.cells.forEach(function(cell) {
                    cell.is_playing = true;
                    cell.draw();
                });
                setTimeout(() => {
                    column.cells.forEach(function(cell) {
                        cell.is_playing = false;
                        cell.draw();
                    });
                }, s_per_beat * 1000);
            }, delay * 1000);

            beat.notes.forEach(function(note) {
                if(note != null) {
                    var source = ctx.createBufferSource();
                    source.buffer = this.audio_buffers[note];
                    source.connect(ctx.destination);
                    source.start(ctx.currentTime + delay);
                }
            }.bind(this));
        }.bind(this));
    }
}

function loopHelper(column, delay) {
    column.cells.forEach(function(cell) {
        cell.is_playing = true;
        cell.draw();
    });
    setTimeout(() => {
        column.cells.forEach(function(cell) {
            cell.is_playing = false;
            cell.draw();
        });
    }, delay * 1000);
}

function Column(x, y, width, row_height, sound_srcs, audio_buffers) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = row_height * sound_srcs.length;

    this.cells = [];

    this.column_size = sound_srcs.length;

    this.fillCells = function() {
        for(var i =0; i < sound_srcs.length; i++) {
            this.cells[i] = new Cell(this.x, this.y + this.h - row_height * i, this.w, row_height, sound_srcs[i], audio_buffers[i]);
        }
    }
}

function Cell(x, y, width, height, sound_src, audio_buffer) {
    this.rect = {
        x: x + 0.5,
        y: y + 0.5,
        w: width - 0.5,
        h: height - 0.5
    }
    this.sound = new Audio();
    this.sound.src = sound_src;

    this.audio_buffer = audio_buffer;

    this.is_playing = false;
    this.is_filled = false;

    this.draw = function() {
        var c = document.getElementById("canvas");
        ctx = c.getContext("2d");

        ctx.lineWidth = 2;
        ctx.strokeStyle = "grey";

        if(this.is_playing && this.is_filled) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        }
        else if(!this.is_playing && this.is_filled) {
            ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
        }
        else if(this.is_playing && !this.is_filled) {
            ctx.fillStyle = "rgba(220, 220, 220, 0.5)";
        }
        else if(!this.is_playing && !this.is_filled) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
        }

        ctx.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    this.play = function() {
        this.sound.play();
        this.sound.currentTime = 0;
    }
}

function Song() {
    this.beats = [];
    this.tempo = 300;
    this.beat_length = "quarter";

    this.readGrid = function(grid) {
        grid.columns.forEach((column, beat_index) => {
            this.beats[beat_index] = new Beat();

            column.cells.forEach((note, note_index) => {
                if(note.is_filled) {
                    this.beats[beat_index].notes[note_index] = note_index;
                }
                else {
                    this.beats[beat_index].notes[note_index] = null;
                }
            });
        });
    }

    this.writeGrid
}

function Beat() {
    this.notes = [];
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