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

    for(var i = 0; i < chords_list.length; i++) {
        var chord_display = chords_list[i];
        chords[i] = new Chord();
        chords[i].root_selector_element = chord_display.querySelector(".chord-root-selection");
        chords[i].mode_selector_element = chord_display.querySelector(".chord-mode-selection");
        chords[i].display_element = chord_display.querySelector(".chord-label");
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
}