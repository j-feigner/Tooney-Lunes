window.onload = main;

function main() {
    var audio_ctx = new AudioContext();

    // Initialize first grid
    var grids = [];

    // Create song object
    var song = new Song();
    song.tracks[0] = new SongTrack("piano");

    // Create first sample grid with piano sounds
    grids.push(createGrid("Melody", "piano", audio_ctx));

    // Add grid to screen
    var add_grid_button = document.getElementById("addGridButton");
    add_grid_button.addEventListener("click", function() {
        var container = document.createElement("div");
        var canvas = document.createElement("canvas");
    
        container.className = "stacking-canvas-container";
        canvas.className = "stacking-canvas";
    
        container.appendChild(canvas);
    
        var page_contents = document.getElementById("pageContents");
        var insert_point = document.getElementById("addGridButton");
        page_contents.insertBefore(container, insert_point);
    
        resizeCanvas2(canvas, container);

        var req = new XMLHttpRequest();
        req.open("GET", "html/grid_overlay_create.html");
        req.onload = () => {
            var prompt_contents = req.responseText;
            container.innerHTML = prompt_contents;

            var submit_button = container.querySelector("#createGridButton");
            submit_button.addEventListener("click", () => {
                var name = container.querySelector("#gridTitle").value;
                var instrument = container.querySelector("#instrumentSelect").value;
                container.remove();
                grids.push(createGrid(name, instrument, audio_ctx));
                song.tracks.push(new SongTrack(instrument));
            })
        }
        req.send();
    });

    var test_tracks = [];

    // Play song button
    var play_button = document.getElementById("playSong");
    play_button.addEventListener("click", function() {
        song.readGrids(grids);
        song.play(audio_ctx);

        grids.forEach((grid) => {
            grid.start(song.tempo);
        })
    });

    // Save song button
    var save_button = document.getElementById("saveSong");
    save_button.addEventListener("click", function() {
        song.readGrids(grids);
        saveSong(song);
    });

    var load_button = document.getElementById("loadSong");
    load_button.addEventListener("click", function() {
        if(confirm("Load song? Unsaved changes will be lost.")) {
            loadSong(test_tracks, grids);
        }
    });

    // Tempo control
    var tempo_slider = document.getElementById("songTempo");
    var tempo_value = document.getElementById("tempoValue");
    tempo_value.innerHTML = song.tempo / 4;
    tempo_slider.addEventListener("input", function() {
        song.tempo = tempo_slider.value * 4;
        tempo_value.innerHTML = tempo_slider.value;
    });
}

function Song() {
    this.title = "Test Title"
    this.tracks = [];
    this.num_beats = 32;
    this.tempo = 120 * 4;

    // Loop through all beat data matrices and set buffer source nodes with proper delays
    this.play = function(audio_ctx) {
        var current_time = audio_ctx.currentTime;

        this.tracks.forEach((track) => {
            track.beat_data.forEach((beat, beat_index) => {
                var delay = 60 / this.tempo * beat_index;

                beat.forEach((note) => {
                    var source = audio_ctx.createBufferSource();
                    source.buffer = track.sounds[note];
                    source.connect(audio_ctx.destination);
                    source.start(current_time + delay);
                })
            })
        })
    }

    this.readGrids = function(grids) {
        grids.forEach((grid, track_index) => {
            this.tracks[track_index].beat_data = grid.getData();
        })
    }
}

function SongTrack(instrument) {
    this.instrument = instrument;
    this.sounds = [];
    this.beat_data = [];
    this.gain = 1.0;

    loadInstrument(instrument, this.sounds);
}

function Grid(num_cols, num_rows, canvas, audio_ctx) {
    this.ctx = canvas.getContext("2d");

    this.instrument = "";

    this.outline_width = 6;
    this.grid_line_width = 1;
    this.line_offset = (this.outline_width / 2) + this.grid_line_width;

    this.rect = {
        x: this.line_offset,
        y: this.line_offset,
        w: canvas.width - (this.line_offset * 2),
        h: canvas.height - (this.line_offset * 2)
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

    this.outline = function() {
        this.ctx.lineWidth = this.outline_width + 0.5;
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.rect(0, 0, canvas.width, canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
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
        this.outline();
        this.draw();
    }

    this.playCellSound = function(index) {
        var source = this.audio_ctx.createBufferSource();
        source.buffer = this.sounds[index];
        source.connect(audio_ctx.destination);
        source.start();
    }

    this.getData = function() {
        var beats = [];
        this.columns.forEach((column, beat_index) => {
            beats[beat_index] = [];
            column.cells.forEach((cell, note_index) => {
                if(cell.is_filled) {
                    beats[beat_index].push(note_index);
                }
            })
        })
        return beats;
    }

    this.getTrackData = function() {
        var track_data = "";
        this.columns.forEach((column) => {
            var beat_data = "";
            column.cells.forEach((cell, note_index) => {
                if(cell.is_filled) {
                    if(beat_data === "") {
                        beat_data += note_index;
                    } else {
                        beat_data += "," + note_index;
                    }
                }
            })
            track_data += beat_data + "\n";
        })
        return track_data;
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
            ctx.fillStyle = "rgba(215, 215, 215, 1.0)";
        }

        ctx.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function createGrid(name, instrument, audio_ctx) {
    var container = document.createElement("div");
    var canvas = document.createElement("canvas");
    var gird_name = document.createElement("span");
    gird_name.innerHTML = name;

    container.className = "stacking-canvas-container";
    canvas.className = "stacking-canvas";
    gird_name.className = "stacking-canvas-label"

    container.appendChild(gird_name);
    container.appendChild(canvas);

    var page_contents = document.getElementById("pageContents");
    var insert_point = document.getElementById("addGridButton");
    page_contents.insertBefore(container, insert_point);

    resizeCanvas2(canvas, container);

    var new_grid = new Grid(40, 12, canvas, audio_ctx);
    new_grid.instrument = instrument;
    new_grid.color_seq = createColorGradient("rgb(255, 125, 0)", "rgb(125, 0, 255)", 12);
    loadInstrument(instrument, new_grid.sounds);
    new_grid.initialize();

    return new_grid;
}

function saveSong(song) {
    var save_title = prompt("Save song as: ", song.title);

    if(confirm("Save song in its current state?")) {
        song.title = save_title;

        var song_json = JSON.stringify(song);
       
        var req = new XMLHttpRequest();
        req.open("GET", "save_song.php?song=" + song_json);
        req.onload = function() {
            alert(req.responseText);
        }
        req.send();
    }
}

function loadSong(tracks_data, grids) {
    tracks_data.forEach((track, track_index) => {
        var beats = track.split('\n');
        beats.forEach((beat, beat_index) => {
            if(beat != "") {
                var current_beat = beat.split(',');
                current_beat.forEach((note) => {
                    grids[track_index].columns[beat_index].cells[parseInt(note)].is_filled = true;
                })
            }
        })
    })

    grids.forEach((grid) => {
        grid.draw();
    })
}