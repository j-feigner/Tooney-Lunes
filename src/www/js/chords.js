window.onload = main;

function main() {
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

    var stopper = 0;
}

function ChordProgressor() {
    this.chords = [];
    this.sounds = [];
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