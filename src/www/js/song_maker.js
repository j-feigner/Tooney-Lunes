window.onload = main;

function main() {
    var audio_ctx = new AudioContext();

    var test_song = new Song();
    test_song.melody_instrument = "piano";
    test_song.percussion_instrument = "drum";
    test_song.loadInstrument(test_song.melody_instrument, test_song.melody_sounds);
    test_song.loadInstrument(test_song.percussion_instrument, test_song.percussion_sounds);

    var melody_canvas = document.getElementById("gridCanvas");
    resizeCanvas("gridCanvas", "gridContainer");

    var melody_grid = new Grid(32, 13, melody_canvas);
    melody_grid.initialize();

    var percussion_canvas = document.getElementById("gridCanvas2");
    resizeCanvas("gridCanvas2", "gridContainer2");

    var percussion_grid = new Grid(32, 7, percussion_canvas);
    percussion_grid.initialize();

    var play_button = document.getElementById("playSong");
    play_button.addEventListener("click", function() {
        test_song.play(audio_ctx);
    });
}

function Song() {
    this.melody_beat_data = [
        [0],
        [0, 2],
        [0, 4],
        [0, 6],
        [0, 4],
        [0, 2],
        [0]
    ];
    this.percussion_beat_data = [];

    this.melody_instrument = "";
    this.percussion_instrument = "";

    this.melody_sounds = [];
    this.percussion_sounds = [];

    this.song_buffers = [];

    this.num_beats = 32;

    this.tempo = 200;

    // Requests and loads instrument data from server from given instrument name
    this.loadInstrument = function(instr_selection, destination) {
        var req = new XMLHttpRequest();
        req.open("GET", "load_instrument.php?name=" + instr_selection);
        req.onload = () => {
            this.loadSounds(req.responseText, instr_selection, destination);
        }
        req.send();
    }

    // Callback function for loadInstrument
    this.loadSounds = function(path_array, instrument, destination) {
        var srcs = JSON.parse(path_array);
        var ctx = new AudioContext();

        // Attach path headers to sound sources
        srcs.forEach((sound, index) => {
            srcs[index] = "sounds/" + instrument + "/" + sound;
        })

        // Request and decode arraybuffers for each sound source
        var req_remaining = srcs.length;
        srcs.forEach((sound, index) => {
            var req = new XMLHttpRequest();
            req.open("GET", sound);
            req.responseType = "arraybuffer";

            req.onload = () => {
                var data = req.response;
                ctx.decodeAudioData(data, (buffer) => { // Decode success callback
                    destination[index] = buffer;

                    if(--req_remaining === 0) { // All sounds successfully loaded
                        var stopper = 0;
                    }
                }, (error) => { // Decode failure callback
                    alert(error);
                })
            }

            req.send();
        })
    }

    // Loop through all beat data matrices and set buffer source nodes with proper delays
    this.play = function(audio_ctx) {
        var current_time = audio_ctx.currentTime;

        this.melody_beat_data.forEach((beat, beat_index) => {
            var delay = 60 / this.tempo * beat_index;
            
            beat.forEach((note) => {
                var source = audio_ctx.createBufferSource();
                source.buffer = this.melody_sounds[note];
                source.connect(audio_ctx.destination);
                source.start(current_time + delay);
            })
        })
    }
}

function Grid(num_cols, num_rows, canvas) {
    this.ctx = canvas.getContext("2d");

    this.rect = {
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height
    };

    this.size = num_cols;

    this.columns = [];
    this.column_size = num_rows;
    this.column_width = this.rect.w / this.size;

    this.color_seq = [];

    this.is_playing = false;

    this.createColumns = function() {
        for(var i = 0; i < this.size; i++) {
            var col_x = this.rect.x + this.column_width * i;

            this.columns[i] = new GridColumn(col_x, this.rect.y, this.column_width, this.rect.h, this.column_size);
            this.columns[i].createCells();
        }
    }

    this.createSubdivisions = function() {

    }

    this.createEventListeners = function() {
        canvas.addEventListener("click", (event) => {
            var mouse_x = event.offsetX;
            var mouse_y = event.offsetY;

            this.columns.forEach((column) => {
                column.cells.forEach((cell) => {
                    if(isInBounds(mouse_x, mouse_y, cell.rect)) {
                        cell.is_filled = !cell.is_filled;
                        cell.draw(this.ctx);
                    }
                })
            })
        })
    }

    this.draw = function() {
        this.columns.forEach((column) => {
            column.draw(this.ctx);
        })
    }

    this.initialize = function() {
        this.createColumns();
        this.createEventListeners();
        this.draw();
    }
}

function GridColumn(col_x, col_y, col_width, col_height, col_size) {
    this.rect = {
        x: col_x,
        y: col_y,
        w: col_width,
        h: col_height
    };

    this.cells = [];

    this.size = col_size

    this.cell_height = this.rect.h / this.size;

    this.createCells = function() {
        for(var i = 0; i < this.size; i++) {
            var cell_y = this.rect.y + this.rect.h - (this.cell_height * i) - this.cell_height;
            this.cells[i] = new GridCell(this.rect.x, cell_y, this.rect.w, this.cell_height);
        }
    }

    this.draw = function(ctx) {
        this.cells.forEach((cell) => {
            cell.draw(ctx);
        })
    }
}

function GridCell(cell_x, cell_y, cell_width, cell_height) {
    this.rect = {
        x: cell_x,
        y: cell_y,
        w: cell_width,
        h: cell_height
    };

    this.color = "red";

    this.is_playing = false;
    this.is_filled = false;

    this.draw = function(ctx) {
        ctx.lineWidth = 1;
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