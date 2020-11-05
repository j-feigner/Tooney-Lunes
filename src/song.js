var url_header = "https://j-feigner.github.io/Tooney-Lunes/src/";

window.onload = main;

function main() {
    var canvas = document.getElementById("gridCanvas");
    resizeCanvas("gridCanvas", "gridContainer");

    var audio_ctx = new AudioContext();

    var sources = [
        "sound_files/piano/C_4.mp3",
        "sound_files/piano/D_4.mp3",
        "sound_files/piano/E_4.mp3",
        "sound_files/piano/F_4.mp3",
        "sound_files/piano/G_4.mp3",
        "sound_files/piano/A_4.mp3",
        "sound_files/piano/B_4.mp3",
        "sound_files/piano/C_5.mp3",
        "sound_files/piano/D_5.mp3",
        "sound_files/piano/E_5.mp3",
        "sound_files/piano/F_5.mp3",
        "sound_files/piano/G_5.mp3",
        "sound_files/piano/A_5.mp3"
    ];

    var song = new Song();
    var grid = new Grid(0, 0, canvas.width, canvas.height, 32, canvas.width / 32, canvas.height / 14, sources);
    grid.draw(canvas);

    canvas.addEventListener("click", function(event) {
        var mouse_x = event.offsetX;
        var mouse_y = event.offsetY;

        for(var i = 0; i < grid.columns.length; i++) {
            for(var j = 0; j < grid.columns[i].cells.length; j++) {
                var cell = grid.columns[i].cells[j];
                if(isInBounds(mouse_x, mouse_y, cell.rect)) {
                    cell.is_filled = !cell.is_filled;
                    cell.draw(canvas);
                    song.readGrid(grid);
                }
            }
        }
    });

    var play_button = document.getElementById("playSong");
    play_button.addEventListener("click", function() {
        grid.playSong(song, audio_ctx, canvas);
    });

    var tempo_slider = document.getElementById("songTempo");
    var tempo_value = document.getElementById("tempoValue");
    tempo_value.innerHTML = song.tempo;
    tempo_slider.addEventListener("input", function() {
        song.tempo = tempo_slider.value;
        tempo_value.innerHTML = tempo_slider.value;
    });
}

function Grid(x, y, width, height, num_cols, col_width, row_height, sound_srcs) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height; 

    this.columns = [];
    this.column_size = sound_srcs.length;
    this.column_number = num_cols;
    this.column_width = col_width;
    this.row_height = row_height;

    this.audio_buffers = [];

    this.color_seq = ["#4897FF","#558AEE","#627EDE","#6E71CD","#7B65BD","#8858AC","#954C9C","#A13F8B","#AE327A","#BB266A","#C81959","#D40D49","#E10038"];

    this.is_playing = false;

    this.requestBuffers = function() {
        var audio_ctx = new AudioContext();
        sound_srcs.forEach((source, index) => {
            var req = new XMLHttpRequest();
            req.open("GET", url_header + source);
            req.responseType = "arraybuffer";
            req.onload = () => {
                var audio_data = req.response;
                audio_ctx.decodeAudioData(audio_data, (buffer) => {
                    this.audio_buffers[index] = buffer;
                });
            }
            req.send();
        });
    }

    this.createColumns = function() {
        for(var i = 0; i < this.column_number; i++) {
            this.columns[i] = new Column(this.x + this.column_width * i, 
                                         this.y, 
                                         this.column_width, 
                                         this.row_height, 
                                         this.column_size,
                                         this.color_seq
                                        );
            this.columns[i].fillCells();
        }
    }

    this.draw = function(canvas) {
        for(var i = 0; i < this.columns.length; i++) {
            for(var j = 0; j < this.columns[i].cells.length; j++) {
                this.columns[i].cells[j].draw(canvas);
            }
        }
    }

    this.playSong = function(song, audio_ctx, canvas) {
        var bpm = song.tempo;
        var s_per_beat = 60 / bpm / 2;
    
        song.beats.forEach(function(beat, beat_index) {
            var delay = s_per_beat * beat_index;

            var column = this.columns[beat_index];

            setTimeout(() => {
                column.cells.forEach(function(cell) {
                    cell.is_playing = true;
                    cell.draw(canvas);
                });
                setTimeout(() => {
                    column.cells.forEach(function(cell) {
                        cell.is_playing = false;
                        cell.draw(canvas);
                    });
                }, s_per_beat * 1000);
            }, delay * 1000);

            beat.notes.forEach(function(note, index) {
                if(note != null) {
                    var source = audio_ctx.createBufferSource();
                    source.buffer = this.audio_buffers[index];
                    source.connect(audio_ctx.destination);
                    source.start(audio_ctx.currentTime + delay);
                }
            }.bind(this));
        }.bind(this));
    }

    this.requestBuffers();
    this.createColumns();
}

function Column(x, y, width, row_height, size, color_seq) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = row_height * size;

    this.cells = [];

    this.fillCells = function() {
        for(var i = 0; i < size; i++) {
            this.cells[i] = new Cell(this.x, 
                                     this.y + this.h - row_height * i, 
                                     this.w, row_height, 
                                     color_seq[i]
                                    );
        }
    }
}

function Cell(x, y, width, height, color) {
    this.rect = {
        x: x + 0.5,
        y: y + 0.5,
        w: width - 0.5,
        h: height - 0.5
    }

    this.is_playing = false;
    this.is_filled = false;

    this.color = color;

    this.draw = function(canvas) {
        ctx = canvas.getContext("2d");

        ctx.lineWidth = 2;
        ctx.strokeStyle = "grey";

        if(this.is_playing && this.is_filled) {
            ctx.fillStyle = "rgba(235, 235, 235, 0.7)";
        }
        else if(!this.is_playing && this.is_filled) {
            ctx.fillStyle = this.color;
        }
        else if(this.is_playing && !this.is_filled) {
            ctx.fillStyle = "rgba(235, 235, 235, 0.15)";
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
}

function Song() {
    this.beats = [];
    this.tempo = 120;
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
}

function Beat() {
    this.notes = [];
}