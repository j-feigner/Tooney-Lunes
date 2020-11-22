window.onload = main;

function main() {
    var song = new Song();

    var app = new SongMaker();
    app.container = document.getElementById("pageContents");

    var new_song_button = document.getElementById("newSong");
    new_song_button.addEventListener("click", () => {
        // Animate intro prompt
        var intro_prompt = document.getElementById("introPrompt");
        intro_prompt.classList.add("fade-out");
        setTimeout(() => {
            intro_prompt.remove();
        }, 750);

        // Create starter grid, song, and display song maker controls
        app.start();
    })
}

function SongMaker() {
    this.container = null;

    this.ctx = null;
    this.song = null;

    this.tracks = [];

    this.song_title = null;
    this.track_adder = null;

    this.play_button = null;
    this.stop_button = null;
    this.volume = null;

    this.start = function() {
        this.initializeAudioContext();
        this.initializeTrackAdder();
        this.createStarterSong();

        this.title_card = document.getElementById("songTitle");
        this.title_card.innerHTML = this.song.title;
    }

    this.createStarterSong = function() {
        var starter_song = new Song();
        starter_song.title = "Untitled";
        starter_song.tempo = 120;
        
        this.song = starter_song;
    }

    this.createMenu = function() {

    }

    this.newTrack = function() {
        // Get new track HTML template from server
        var req = new XMLHttpRequest();
        req.open("GET", "html/song_maker_track.html", true);
        req.onload = () => {
            var div = document.createElement("div");
            div.innerHTML = req.responseText;

            // Referencce variable to given track
            var track_container = div.firstChild;
            
            // On track creation submit, create Grid, SongMakerTrack and hide overlay
            var track_submit = track_container.querySelector(".track-creation-form button");
            track_submit.addEventListener("click", () => {
                var name = track_container.querySelector(".track-creation-form input[type='text']").value;
                var instrument = track_container.querySelector(".track-creation-form select").value;

                // Create and initialize new track
                var new_track = new SongMakerTrack(name, instrument, this.ctx);
                new_track.createGain();

                // Set track label and make visible
                var track_label = track_container.querySelector(".track-label");
                track_label.innerHTML = name;
                track_label.style.display = "block";

                // Set gain and make visible
                var track_gain = track_container.querySelector(".track-gain");
                track_gain.addEventListener("input", () => {
                    new_track.gain_node.gain.value = track_gain.value;
                })
                track_gain.style.display = "block";

                // Create and initialize grid values for new track
                var grid_canvas = track_container.querySelector(".grid-canvas");
                resizeCanvas2(grid_canvas, track_container);
                new_track.grid = new Grid(40, 12, grid_canvas, this.ctx, new_track.gain_node);
                new_track.grid.instrument = new_track.instrument;
                new_track.grid.color_seq = createColorGradient("rgb(255, 125, 0)", "rgb(125, 0, 255)", 12);
                new_track.grid.initialize();
                this.tracks.push(new_track);

                // Empty and hide track overlay
                var track_overlay = track_container.querySelector(".track-overlay");
                track_overlay.innerHTML = "";
                track_overlay.style.display = "none"; 
            })

            // Add track to SongMaker div container
            this.container.insertBefore(track_container, this.track_adder);
        }
        req.send();
    }

    this.initializeAudioContext = function() {
        this.ctx = new AudioContext();
    }

    this.initializeTrackAdder = function() {
        this.track_adder = document.getElementById("addGridButton");
        this.track_adder.style.display = "block";

        this.track_adder.addEventListener("click", () => {
            this.newTrack();
        });
    }

    this.play = function() {
        this.updateSongFromGrids();
        this.song.play(this.ctx);
        this.grids.forEach((grid) => {
            grid.start(this.song.tempo);
        })
    }

    this.updateSongFromGrids = function() {
        this.grids.forEach((grid, index) => {
            this.song.tracks[index].beat_data = grid.getData();
        })
    }

    this.saveSongToDatabase = function() {
        var save_title = prompt("Save song as: ", this.song.title);

        if(confirm("Save song in its current state?")) {
            this.song.title = save_title;
    
            var song_json = JSON.stringify(this.song);
           
            var req = new XMLHttpRequest();
            req.open("GET", "save_song.php?song=" + song_json);
            req.onload = function() {
                alert(req.responseText);
            }
            req.send();
        }
    }
}

function SongMakerTrack(track_name, instrument, audio_ctx) {
    this.name = track_name;
    this.instrument = instrument;
    this.grid = null;
    this.gain_node = null;
    this.settings = null;

    this.createGain = function() {
        this.gain_node = audio_ctx.createGain();
        this.gain_node.connect(audio_ctx.destination);
    }
}

function Grid(num_cols, num_rows, canvas, audio_ctx, audio_hook) {
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
    this.destination = audio_hook;

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
        loadInstrument(this.instrument, this.sounds);
        this.createColumns();
        this.createEventListeners();
        this.outline();
        this.draw();
    }

    this.playCellSound = function(index) {
        var source = this.audio_ctx.createBufferSource();
        source.buffer = this.sounds[index];
        source.connect(this.destination);
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

    this.loadTrack = function(beat_data) {
        beat_data.forEach((beat, beat_index) => {
            beat.forEach((note) => {
                this.columns[beat_index].cells[note].is_filled = true;
            })
        })
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
            ctx.fillStyle = "rgba(245, 245, 245, 1.0)";
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
    var grid_name = document.createElement("span");
    grid_name.innerHTML = name;

    var grid_gain = document.createElement("input");
    grid_gain.type = "range";
    grid_gain.min = 0.0;
    grid_gain.max = 1.0;
    grid_gain.step = 0.01;
    grid_gain.value = 1.0;

    grid_gain.addEventListener("input", function() {

    })

    container.className = "stacking-canvas-container";
    canvas.className = "stacking-canvas";
    grid_name.className = "stacking-canvas-label"
    grid_gain.className = "stacking-canvas-gain";

    container.appendChild(grid_name);
    container.appendChild(grid_gain);
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