window.onload = main;

function main() {
    var song = new Song();

    var app = new SongMaker();
    app.container = document.getElementById("pageContents");

    var intro_prompt = document.getElementById("introPrompt");

    var new_song_button = document.getElementById("newSong");
    new_song_button.addEventListener("click", () => {
        intro_prompt.classList.add("fade-out");
        setTimeout(() => {
            intro_prompt.remove();
        }, 750);

        // Create starter grid, song, and display song maker controls
        app.startFromNew();
    })

    var load_song_button = document.getElementById("loadSong");
    load_song_button.addEventListener("click", () => {
        intro_prompt.classList.add("fade-out");
        setTimeout(() => {
            intro_prompt.remove();
        }, 750);

        app.startFromLoad();
    })
}

function SongMaker() {
    this.container = null;

    this.ctx = null;
    this.gain_node = null;

    this.size = 40;

    this.song = null;

    this.tracks = [];

    this.track_adder = null;
    this.play_button = null;
    this.stop_button = null;
    this.volume = null;
    this.save_button = null;

    this.insert_point = null;

    this.is_playing = false;
    this.is_paused = false;

    this.startFromNew = function() {
        this.song = new Song();
        this.song.title = "New Song"
        this.song.tempo = 120;

        this.insert_point = this.container.querySelector(".song-maker-insert-container");

        this.initializeAudioContext();
        this.createTrack("Melody", "piano", "starter");
        this.createUI();

        this.title_card = document.getElementById("songTitle");
        this.title_card.innerHTML = this.song.title;
    }

    this.startFromLoad = function() {
        this.insert_point = this.container.querySelector(".song-maker-insert-container");
        this.title_card = document.getElementById("songTitle");

        this.initializeAudioContext();
        this.createUI();
        this.loadSongFromDatabase();
    }

    this.initializeAudioContext = function() {
        this.ctx = new AudioContext();
        this.gain_node = this.ctx.createGain();
        this.gain_node.connect(this.ctx.destination);
    }

    this.createUI = function() {
        // Grab menu and inject into container
        var req = new XMLHttpRequest();
        req.open("GET", "html/song-maker-ui.html", true);
        req.onload = () => {
            var div = document.createElement("div");
            div.innerHTML = req.responseText;

            this.container.appendChild(div.firstChild);

            // Create event listeners for menu items
            this.track_adder = this.container.querySelector(".add-track-button-container img");
            this.track_adder.addEventListener("click", () => {
                this.createTrack();
            })

            this.play_button = this.container.querySelector(".song-maker-controls .play-song");
            this.play_button.addEventListener("click", () => {
                this.play();
            })
    
            this.volume_control = this.container.querySelector(".master-volume-container input");
            this.volume_control.addEventListener("input", () => {
                this.gain_node.gain.value = this.volume_control.value;
            })
    
            this.tempo_control = this.container.querySelector(".tempo-container input");
            this.tempo_control.addEventListener("input", () => {
                this.song.tempo = this.tempo_control.value * 4;
            })

            this.save_button = this.container.querySelector(".song-maker-controls .save-song");
            this.save_button.addEventListener("click", () => {
                this.saveSongToDatabase();
            })
        }
        req.send();
    }
    
    this.loadTrackHTML = function(callback) {
        var req = new XMLHttpRequest();
        req.open("GET", "html/song_maker_track.html", true);
        req.onload = () => {
            var div = document.createElement("div");
            div.innerHTML = req.responseText;
            callback(div.firstChild);
        }
        req.send();
    }

    this.createTrack = function(name, instrument, type) {
        this.loadTrackHTML(track_container => {
            this.container.insertBefore(track_container, this.insert_point);

            // Create new track object
            var new_track = new SongMakerTrack(name, instrument, this.ctx, this.gain_node);
            new_track.createGain();
            loadInstrument(instrument, new_track.sounds);

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
            new_track.grid = new Grid(64, 12, grid_canvas, this.ctx, new_track.gain_node);
            new_track.grid.instrument = new_track.instrument;
            new_track.grid.color_seq = createColorGradient("rgb(255, 125, 0)", "rgb(125, 0, 255)", 12);
            new_track.grid.initialize();
            this.tracks.push(new_track);

            // Empty and hide track overlay
            var track_overlay = track_container.querySelector(".track-overlay");
            if(type === "starter") {
                track_overlay.style.display = "none"; 
            }
        });
    }

    this.play = function() {
        this.tracks.forEach((track) => {
            track.grid.start(this.song.tempo);
            track.play(this.song.tempo);
        })
    }

    this.updateSongFromGrids = function() {
        this.tracks.forEach((track, index) => {
            this.song.tracks[index].beat_data = track.grid.getData();
        })
    }

    this.saveSongToDatabase = function() {
        var save_title = prompt("Save song as: ", this.song.title);

        if(confirm("Save song in its current state?")) {
            this.song.title = save_title;

            this.updateSongFromGrids();
    
            var song_json = JSON.stringify(this.song);
           
            var req = new XMLHttpRequest();
            req.open("GET", "save_song.php?song=" + song_json);
            req.onload = function() {
                alert(req.responseText);
            }
            req.send();
        }
    }

    this.loadSongFromDatabase = function() {
        var load_title = prompt("Load song by title: ");

        if(confirm("Load song?")) {
            var req = new XMLHttpRequest();
            req.open("GET", "load_song.php?title=" + load_title, true);
            req.onload = () => {
                this.song = JSON.parse(req.responseText);
                this.tracks = [];
                this.song.tracks.forEach((track) => {
                    this.createSongMakerTrack(track);
                })
                this.title_card.innerHTML = this.song.title;
            }
            req.send();
        }
    }
}

function SongMakerTrack(track_name, instrument, audio_ctx, ctx_destination) {
    this.name = track_name;
    this.instrument = instrument;

    this.grid = null;
    this.grid_data = [];

    this.beat_length = 2;

    this.sounds = [];
    this.sound_offset = 0;

    this.gain_node = null;

    this.settings = null;

    this.createGrid = function(container, num_notes) {

    }

    this.play  = function(tempo) {
        this.updateData();
        var current_time = audio_ctx.currentTime;
        this.grid_data.forEach((beat, beat_index) => {
            var delay = 60 / tempo * beat_index;

            beat.forEach((note) => {
                var source = audio_ctx.createBufferSource();
                source.buffer = this.sounds[note + this.sound_offset];
                source.connect(this.gain_node);
                source.start(current_time + delay);
            })
        })
    }

    this.updateData = function() {
        this.grid_data = this.grid.getData();
    }

    this.createGain = function() {
        this.gain_node = audio_ctx.createGain();
        this.gain_node.connect(ctx_destination);
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

    this.column_color_1 = "rgba(245, 245, 245, 1.0)";
    this.column_color_2 = "rgba(220, 220, 220, 1.0)";
    this.color_seq = [];

    this.sounds = [];
    this.audio_ctx = audio_ctx;
    this.destination = audio_hook;

    this.is_playing = false;

    // Initialize column objects with calculated rect coordinates
    this.createColumns = function() {
        var column_color = this.column_color_1;
        for(var i = 0; i < this.size; i++) {
            if(i % 4 === 0) {
                (column_color === this.column_color_1) ? column_color = this.column_color_2 : column_color = this.column_color_1; 
            }
            var col_x = this.rect.x + this.column_width * i;

            this.columns[i] = new GridColumn(col_x, this.rect.y, this.column_width, this.rect.h, this.column_size, column_color, this.color_seq);
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

    this.putData = function(beat_data) {
        beat_data.forEach((beat, beat_index) => {
            beat.forEach((note) => {
                this.columns[beat_index].cells[note].is_filled = true;
            })
        })
    }
}

function GridColumn(col_x, col_y, col_width, col_height, col_size, col_color, cell_colors) {
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
            this.cells[i] = new GridCell(this.rect.x, cell_y, this.rect.w, this.cell_height, col_color, cell_colors[i]);
        }
    }

    // Loop through and draw each cell in this column
    this.draw = function(ctx) {
        this.cells.forEach((cell) => {
            cell.draw(ctx);
        })
    }
}

function GridCell(cell_x, cell_y, cell_width, cell_height, base_color, fill_color) {
    this.rect = {
        x: cell_x + 0.5,
        y: cell_y + 0.5,
        w: cell_width - 0.5,
        h: cell_height - 0.5
    };

    this.base_color = base_color;
    this.filled_color = fill_color;

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
            ctx.fillStyle = this.filled_color;
        }
        else if(this.is_playing && !this.is_filled) {
            ctx.fillStyle = "rgba(235, 235, 235, 0.15)";
        }
        else if(!this.is_playing && !this.is_filled) {
            ctx.fillStyle = this.base_color;
        }

        ctx.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

        ctx.beginPath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}