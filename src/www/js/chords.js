window.onload = main;

function main() {
    var ctx = new AudioContext();

    var app_container = document.querySelector(".chord-app-container");
    var chords_container = app_container.querySelector(".chords-container");
    var chords_list = chords_container.querySelectorAll(".chord-display-container");

    var app = new ChordProgressor();

    loadInstrument("piano", app.sounds, function() {
        // alert("All sounds loaded");
    })

    // Grab all HTML element references and store in Chord objects
    for(var i = 0; i < chords_list.length; i++) {
        var chord_display = chords_list[i];
        app.chords[i] = new Chord();
        app.chords[i].root_selector_element = chord_display.querySelector(".chord-root-selection");
        app.chords[i].mode_selector_element = chord_display.querySelector(".chord-mode-selection");
        app.chords[i].display_element = chord_display.querySelector(".chord-label");
        app.chords[i].update();
        app.chords[i].createEventListeners();
    }

    app.start_button = app_container.querySelector(".chords-controls button");
    app.start_button.addEventListener("click", () => {
        app.play(ctx);
    })

    app.tempo_slider = app_container.querySelector(".chords-controls .tempo-container input");
    app.tempo_slider.addEventListener("input", () => {
        app.tempo = app.tempo_slider.value;
        app.adjusted_tempo = app.tempo * 4;
    })

    var stopper = 0;
}

function ChordProgressor() {
    this.chords = [];
    this.sounds = [];

    this.tempo = 0;
    this.adjusted_tempo = 0;

    this.start_button = null;
    this.tempo_slider = null;

    this.chord_structures = {
        major: [0, 4, 7],
        minor: [0, 3, 7]
    };

    this.play = function(audio_ctx) {
        var sample_chord = this.chords[0];

        this.chord_structures[sample_chord.mode].forEach((note) => {
            var source = audio_ctx.createBufferSource();
            source.buffer = this.sounds[note + 24 - (12 - sample_chord.root)];
            source.connect(audio_ctx.destination);
            source.start(0);
        })
    }
}

function Chord() {
    this.root = "";
    this.mode = "";
    this.display = "";

    this.root_selector_element = null;
    this.mode_selector_element = null;
    this.display_element = null;

    this.createEventListeners = function() {
        this.root_selector_element.addEventListener("change", () => {
            this.root = this.root_selector_element.selectedIndex;
        })

        this.mode_selector_element.addEventListener("change", () => {
            this.mode = this.mode_selector_element.value;
        })
    }

    this.update = function() {
        this.root = this.root_selector_element.selectedIndex;
        this.mode = this.mode_selector_element.value;
        this.display = this.display_element.innerHTML;
    }
}