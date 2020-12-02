window.onload = main;

function main() {
    var piano_srcs = [];

    loadInstrument("piano", piano_srcs, function() {
        //alert("Sounds loaded");
    });

    var app_container = document.querySelector(".chord-app-container");
    var chords_container = app_container.querySelector(".chords-container");
    var chords_list = chords_container.querySelectorAll(".chord-display-container");

    var chords = [];

    // Grab all HTML element references and store in Chord objects
    for(var i = 0; i < chords_list.length; i++) {
        var chord_display = chords_list[i];
        chords[i] = new Chord();
        chords[i].root_selector_element = chord_display.querySelector(".chord-root-selection");
        chords[i].mode_selector_element = chord_display.querySelector(".chord-mode-selection");
        chords[i].display_element = chord_display.querySelector(".chord-label");
        chords[i].update();
        chords[i].createEventListeners();
    }

    var stopper = 0;
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