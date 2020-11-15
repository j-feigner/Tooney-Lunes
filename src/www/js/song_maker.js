window.onload = main;

function main() {
    var audio_ctx = new AudioContext();

    // Create and resize canvases
    var melody_canvas = document.getElementById("gridCanvas");
    var percussion_canvas = document.getElementById("gridCanvas2");
    resizeCanvas("gridCanvas", "gridContainer");
    resizeCanvas("gridCanvas2", "gridContainer2");

    // Create and initialize grids
    var melody_grid = new Grid(32, 13, melody_canvas, audio_ctx);
    melody_grid.color_seq = createColorGradient("rgb(255, 125, 0)", "rgb(125, 0, 255)", 13);
    melody_grid.initialize();

    var percussion_grid = new Grid(32, 7, percussion_canvas, audio_ctx);
    percussion_grid.color_seq = createColorGradient("rgb(125, 200, 0)", "rgb(255, 125, 0)", 7);
    percussion_grid.initialize();

    // Create song object
    var song = new Song();
    song.melody_instrument = "piano";
    song.percussion_instrument = "drum";

    // Load all instrument sounds into song object and grids
    loadInstrument(song.melody_instrument, song.melody_sounds);
    loadInstrument(song.melody_instrument, melody_grid.sounds);
    loadInstrument(song.percussion_instrument, song.percussion_sounds);
    loadInstrument(song.percussion_instrument, percussion_grid.sounds);

    // Play song button
    var play_button = document.getElementById("playSong");
    play_button.addEventListener("click", function() {
        song.readGrid(melody_grid, song.melody_beat_data);
        song.readGrid(percussion_grid, song.percussion_beat_data);

        song.play(audio_ctx);

        melody_grid.start(song.tempo);
        percussion_grid.start(song.tempo);
    });

    // Tempo control
    var tempo_slider = document.getElementById("songTempo");
    var tempo_value = document.getElementById("tempoValue");
    tempo_value.innerHTML = song.tempo;
    tempo_slider.addEventListener("input", function() {
        song.tempo = tempo_slider.value * 2;
        tempo_value.innerHTML = tempo_slider.value;
    });
}

function Song() {
    this.melody_beat_data = [];
    this.percussion_beat_data = [];

    this.melody_instrument = "";
    this.percussion_instrument = "";

    this.melody_sounds = [];
    this.percussion_sounds = [];

    this.song_buffers = [];

    this.num_beats = 32;

    this.tempo = 120;

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
        this.percussion_beat_data.forEach((beat, beat_index) => {
            var delay = 60 / this.tempo * beat_index;
            
            beat.forEach((note) => {
                var source = audio_ctx.createBufferSource();
                source.buffer = this.percussion_sounds[note];
                source.connect(audio_ctx.destination);
                source.start(current_time + delay);
            })
        })
    }

    // Read data from grid object and insert into data_array
    this.readGrid = function(grid, data_array) {
        grid.columns.forEach((column, beat_index) => {
            data_array[beat_index] = [];

            column.cells.forEach((note, note_index) => {
                if(note.is_filled) {
                    data_array[beat_index].push(note_index);
                }
            })
        })
    }
}

function Grid(num_cols, num_rows, canvas, audio_ctx) {
    this.ctx = canvas.getContext("2d");

    this.rect = {
        x: 2,
        y: 2,
        w: canvas.width - 4,
        h: canvas.height - 4
    };

    this.size = num_cols;

    this.columns = [];
    this.column_size = num_rows;
    this.column_width = this.rect.w / this.size;

    this.color_seq = [];

    this.sounds = [];
    this.audio_ctx = audio_ctx;

    this.is_playing = false;

    // Initialize column objects with calculated rect coordinates
    this.createColumns = function() {
        for(var i = 0; i < this.size; i++) {
            var col_x = this.rect.x + this.column_width * i;

            this.columns[i] = new GridColumn(col_x, this.rect.y, this.column_width, this.rect.h, this.column_size, this.color_seq);
            this.columns[i].createCells();
        }
    }

    // Initialize measure lines or beat divisions for song organization
    this.createSubdivisions = function() {

    }

    // Creates ecent listeners on the canvas the grid is rendering to
    this.createEventListeners = function() {
        canvas.addEventListener("click", (event) => {
            var mouse_x = event.offsetX;
            var mouse_y = event.offsetY;

            this.columns.forEach((column) => {
                column.cells.forEach((cell, index) => {
                    if(isInBounds(mouse_x, mouse_y, cell.rect)) {
                        cell.is_filled = !cell.is_filled;
                        cell.draw(this.ctx);
                        if(cell.is_filled) {
                            this.playCellSound(index);
                        }
                    }
                })
            })
        })
    }

    // Loop through and draw all columns
    this.draw = function() {
        this.columns.forEach((column) => {
            column.draw(this.ctx);
        })
    }

    // Starts the song playing animation with column and note highlighting
    // This function is called seperately from Song.play() 
    this.start = function(tempo) {
        var ms_per_beat = 60 / tempo * 1000;

        this.columns.forEach((column, index) => {
            var delay = ms_per_beat * index;

            setTimeout(() => {
                column.cells.forEach((cell) => {
                    cell.is_playing = true;
                    cell.draw(this.ctx);
                });
                setTimeout(() => {
                    column.cells.forEach((cell) => {
                        cell.is_playing = false;
                        cell.draw(this.ctx);
                    });
                }, ms_per_beat);
            }, delay);
        })
    }

    // Set all initial values for Grid object
    this.initialize = function() {
        this.createColumns();
        this.createEventListeners();
        this.draw();
    }

    this.playCellSound = function(index) {
        var source = this.audio_ctx.createBufferSource();
        source.buffer = this.sounds[index];
        source.connect(audio_ctx.destination);
        source.start();
    }
}

function GridColumn(col_x, col_y, col_width, col_height, col_size, color_seq) {
    this.rect = {
        x: col_x,
        y: col_y,
        w: col_width,
        h: col_height
    };

    this.cells = [];

    this.size = col_size

    this.cell_height = this.rect.h / this.size;

    // Initializes cell objects with calculated rect coordinates
    this.createCells = function() {
        for(var i = 0; i < this.size; i++) {
            var cell_y = this.rect.y + this.rect.h - (this.cell_height * i) - this.cell_height;
            this.cells[i] = new GridCell(this.rect.x, cell_y, this.rect.w, this.cell_height, color_seq[i]);
        }
    }

    // Loop through and draw each cell in this column
    this.draw = function(ctx) {
        this.cells.forEach((cell) => {
            cell.draw(ctx);
        })
    }
}

function GridCell(cell_x, cell_y, cell_width, cell_height, cell_color) {
    this.rect = {
        x: cell_x + 0.5,
        y: cell_y + 0.5,
        w: cell_width - 0.5,
        h: cell_height - 0.5
    };

    this.color = cell_color;

    this.is_playing = false;
    this.is_filled = false;

    // Clear cell and draw updated value to canvas context
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