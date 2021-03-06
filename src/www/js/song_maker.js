window.onload = main;

function main() {
    var app = new SongMaker();
    app.container = document.getElementById("pageContents");

    var intro_prompt = document.getElementById("introPrompt");

    if(song_id === false) {
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
    } else {
        intro_prompt.style.display = "none";
        app.startFromPublicLoad(song_id);
    }
}

function SongMaker() {
    this.container = null;

    this.ctx = null;
    this.gain_node = null;

    this.size = 40;

    this.song = null;

    this.tempo = 120;

    this.root = 0;
    this.mode = "major";

    this.tracks = [];

    this.track_adder = null;
    this.play_button = null;
    this.stop_button = null;
    this.scrollbar = null;
    this.volume = null;
    this.settings_button = null;
    this.share_button = null;
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
        this.createTrack("starter");
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
    
    this.startFromPublicLoad = function(song_id) {
        this.insert_point = this.container.querySelector(".song-maker-insert-container");
        this.title_card = document.getElementById("songTitle");

        this.initializeAudioContext();
        this.createUI();
        this.loadPublicSong(song_id);
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
                this.tempo = this.tempo_control.value * 4;
            })

            this.settings_button = this.container.querySelector(".song-settings");
            this.settings_button.addEventListener("click", () => {
                this.openSettingsMenu();
            })

            this.save_button = this.container.querySelector(".song-maker-controls .save-song");
            this.save_button.addEventListener("click", () => {
                this.saveSongToDatabase();
            })

            this.share_button = this.container.querySelector(".share-song");
            this.share_button.addEventListener("click", () => {
                this.savePublicSong();
            })

            this.scrollbar = this.container.querySelector(".song-maker-ui .scrollbar-container input");
            this.scrollbar.addEventListener("input", () => {
                this.scrollTracks();
            })
        }
        req.send();
    }

    // Creates a new track and initializes corresponding grid
    this.createTrack = function(type_option) {
        this.loadTrackHTML(track_container => {
            this.container.insertBefore(track_container, this.insert_point);

            var track_name = "";
            var track_instrument = "";

            var track_overlay = track_container.querySelector(".track-overlay");
            if(type_option === "starter") {
                track_name = "Melody";
                track_instrument = "piano";
  
                this.initializeTrack(track_container, track_name, track_instrument);
            }
            else {
                track_overlay.style.display = "block";

                var track_creation_form = track_overlay.querySelector(".track-creation-form");
                track_creation_form.style.display = "block";

                var name_input = track_creation_form.querySelector("input[type='text']");
                var instr_input = track_creation_form.querySelector("select");
                var submit = track_creation_form.querySelector("button");

                submit.addEventListener("click", () => {
                    track_name = name_input.value;
                    track_instrument = instr_input.value;
                    track_creation_form.style.display = "none";
                    track_overlay.style.display = "none";

                    this.initializeTrack(track_container, track_name, track_instrument);
                })
            }
        });
    }
       
    // Async function called within createTrack() to get track container HTML from server
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

    this.initializeTrack = function(container, name, instrument) {
        // Create new track object
        var new_track = new SongMakerTrack(name, instrument, this.ctx, this.gain_node);
        new_track.createGain();

        if(new_track.instrument === "drum") {
            new_track.mode = "none";
        }

        // Create and initialize grid values for new track
        var grid_canvas = container.querySelector(".grid-canvas");
        grid_canvas.height = 325;
        grid_canvas.width = 3500;

        new_track.grid = new Grid(128, 15, grid_canvas, this.ctx, new_track.gain_node);
        new_track.grid.instrument = new_track.instrument;
        new_track.grid.color_seq = createColorGradient("rgb(255, 125, 0)", "rgb(125, 0, 255)", 15);
        new_track.grid.initialize();

        // Load instrument sounds into track and grid
        loadInstrument(instrument, new_track.sounds, new_track.updateMode);

        // Set track label and make visible
        var track_label = container.querySelector(".track-label");
        track_label.innerHTML = name;
        track_label.style.display = "block";

        // Set gain and make visible
        var track_gain = container.querySelector(".track-gain");
        track_gain.addEventListener("input", () => {
            new_track.gain_node.gain.value = track_gain.value;
        })
        track_gain.style.display = "block";

        this.tracks.push(new_track);
    }

    this.play = function() {
        this.tracks.forEach((track) => {
            track.grid.start(this.tempo);
            track.play(this.tempo);
        })
    }

    this.updateSongFromGrids = function() {
        this.tracks.forEach((track, index) => {
            this.song.tracks[index] = {
                instrument: track.instrument,
                beat_data: []
            }
            this.song.tracks[index].beat_data = track.grid.getData();
        })
    }

    this.saveSongToDatabase = function() {
        var save_title = prompt("Save song as: ");

        if(confirm("Save song in its current state?")) {
            // Song object to save
            var song = {
                title: save_title,
                tempo: 120,
                tracks: []
            }

            // Fill song tracks array with objects to save 
            this.tracks.forEach((track, index) => {
                song.tracks[index] = {
                    label: track.name,
                    instrument: track.instrument,
                    beat_data: track.grid.getData()
                }
            })

            var song_json = JSON.stringify(song);
           
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
                var song = JSON.parse(req.responseText);
                this.tracks = [];
                song.tracks.forEach((track, index) => {
                    this.loadTrackHTML(track_container => {
                        this.container.insertBefore(track_container, this.insert_point);

                        var track_name = track.name
                        var track_instrument = track.instrument;
            
                        this.initializeTrack(track_container, track_name, track_instrument);

                        this.tracks[index].grid.putData(track.beat_data);
                        this.tracks[index].grid.draw();
                    })
                })
                this.title_card.innerHTML = song.title;
            }
            req.send();
        }
    }

    this.savePublicSong = function() {
        var save_title = prompt("Save song as: ");

        if(confirm("Save song?")) {
            // Song object to save
            var song = {
                title: save_title,
                tempo: 120,
                tracks: []
            }

            // Fill song tracks array with objects to save 
            this.tracks.forEach((track, index) => {
                song.tracks[index] = {
                    label: track.name,
                    instrument: track.instrument,
                    beat_data: track.grid.getData()
                }
            })

            var song_json = JSON.stringify(song);
            
            var req = new XMLHttpRequest();
            req.open("GET", "save_public_song.php?song=" + song_json);
            req.onload = () => {
                var url_display = this.container.querySelector(".song-maker-share-display");
                url_display.style.display = "block";

                var url_textbox = url_display.querySelector(".url-container input");
                url_textbox.value = "http://tooney-lunes/song_maker.php?song=" + req.responseText;
            }
            req.send();
        }
    }

    this.loadPublicSong = function(song_id) {
        var req = new XMLHttpRequest();
        req.open("GET", "load_public_song.php?id=" + song_id, true);
        req.onload = () => {
            var song = JSON.parse(req.responseText);
            this.tracks = [];
            song.tracks.forEach((track, index) => {
                this.loadTrackHTML(track_container => {
                    this.container.insertBefore(track_container, this.insert_point);

                    var track_name = track.name
                    var track_instrument = track.instrument;
        
                    this.initializeTrack(track_container, track_name, track_instrument);

                    this.tracks[index].grid.putData(track.beat_data);
                    this.tracks[index].grid.draw();
                })
            })
            this.title_card.innerHTML = song.title;
        }
        req.send();
    }

    this.openSettingsMenu = function() {
        var settings_menu = this.container.querySelector(".song-maker-settings-menu-container");
        settings_menu.style.display = "block";

        var title_input = settings_menu.querySelector(".setting-song-title input");
        title_input.value = this.song.title;

        var root_input = settings_menu.querySelector(".setting-root-note select");

        var submit = settings_menu.querySelector(".settings-menu-submit button");
        submit.addEventListener("click", () => {
            this.updateSettings(title_input.value, root_input.selectedIndex);
            settings_menu.style.display = "none";
        })
    }

    this.updateSettings = function(new_title, new_root) {
        this.song.title = new_title;
        this.title_card.innerHTML = new_title;

        this.root = new_root;
        this.tracks.forEach((track) => {
            track.mode_root = this.root;
            track.updateMode();
        })
    }

    this.scrollTracks = function() {
        var grid_containers = document.getElementsByClassName("grid-canvas");

        for(var i = 0; i < grid_containers.length; i++) {
            var grid = grid_containers.item(i);
            var scroll_amount = parseFloat(this.scrollbar.value) * 1750;
            var css_format = "-" + scroll_amount.toString() + "px";
            grid.style.left = css_format;
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

    this.mode = "major";
    this.mode_sounds = [];
    this.mode_root = 0;
    this.octave_offset = 12;

    this.gain_node = null;

    this.settings = null;

    this.play = function(tempo) {
        this.updateData();
        var current_time = audio_ctx.currentTime;
        this.grid_data.forEach((beat, beat_index) => {
            var delay = 60 / tempo * beat_index;

            beat.forEach((note) => {
                var source = audio_ctx.createBufferSource();
                source.buffer = this.mode_sounds[note];
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

    this.updateMode = () => {
        var selected_mode = [];
        var scale_counter  = 0;
        var jump_value = this.octave_offset - (12 - this.mode_root);

        if (this.mode === "major") {
            selected_mode = [2, 2, 1, 2, 2, 2, 1];
        } else if (this.mode === "minor") {
            selected_mode = [2, 1, 2, 2, 1, 2, 2];
        } else if(this.mode === "none") {
            this.mode_sounds = this.sounds;
            this.grid.sounds = this.mode_sounds;
            return;
        }

        this.mode_sounds = [];

        this.mode_sounds[0] = this.sounds[jump_value];
        for(var i = 1; i < 15; i++) {
            jump_value += selected_mode[scale_counter];
            this.mode_sounds[i] = this.sounds[jump_value];

            scale_counter++;
            if(scale_counter === selected_mode.length) {
                scale_counter = 0;
            }
        }
        this.grid.sounds = this.mode_sounds;
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
        //loadInstrument(this.instrument, this.sounds);
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