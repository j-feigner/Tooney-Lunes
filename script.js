var beats = [
    [19], 
    [19], 
    [12, 16, 19, 21], 
    null, 
    [19], 
    null, 
    [24], 
    null, 
    [17, 19, 23], 
    null, 
    null, 
    null, 
    [19], 
    [19], 
    [17, 19, 21], 
    null,
    [19], 
    null, 
    [26], 
    null, 
    [12, 16, 19, 24], 
    null, 
    null, 
    null, 
    [19], 
    [19], 
    [12, 16, 19, 31], 
    null, 
    [28],
    null, 
    [24], 
    null, 
    [17, 21, 23], 
    null, 
    [21], 
    null, 
    null, 
    null, 
    [29], 
    [29], 
    [12, 16, 19, 28], 
    null, 
    [24], 
    null, 
    [17, 19, 26], 
    null, 
    [12, 16, 19, 24]
];
var tempo = 180;

// Plays a song with a specified instrument at a specified tempo
// Expects an array of sound source files
// Expects a two dimensional array of song data
// Expects an integer tempo value in beats per minute
function playSong(sounds, beats, tempo) {
    for(var beat_num = 0; beat_num < beats.length; beat_num++) {
        var current_beat = beats[beat_num];
        playBeat(sounds, current_beat, beat_num, tempo);
    }
}

// Timeout function called in playSong() to create tempo
function playBeat(sounds, current_beat, beat_num, tempo) {
    var beat_length_ms = 60000.0 / tempo;
    setTimeout(function() {
        if(current_beat == null) {
            // Empty for rest beat
        }
        else {
            // Loop through and play all notes in current beat
            for(var note_num = 0; note_num < current_beat.length; note_num++) {
                var current_note = current_beat[note_num];
                var key = document.getElementById(current_note);
                playNote(sounds, key);
            }
        }
    }, beat_num * beat_length_ms) // Sets wait time between each beat
}