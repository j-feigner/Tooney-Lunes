var sounds = createSoundArray("piano_grand");
createPiano(sounds);

function createSoundArray(instrument) {
    var sound_srcs = [
        "sound_files/" + "C_" + instrument + ".mp3",
        "sound_files/" + "Cs_" + instrument + ".mp3",
        "sound_files/" + "D_" + instrument + ".mp3",
        "sound_files/" + "Ds_" + instrument + ".mp3",
        "sound_files/" + "E_" + instrument + ".mp3",
        "sound_files/" + "F_" + instrument + ".mp3",
        "sound_files/" + "Fs_" + instrument + ".mp3",
        "sound_files/" + "G_" + instrument + ".mp3",
        "sound_files/" + "Gs_" + instrument + ".mp3",
        "sound_files/" + "A_" + instrument + ".mp3",
        "sound_files/" + "As_" + instrument + ".mp3",
        "sound_files/" + "B_" + instrument + ".mp3",
        "sound_files/" + "octave_" + instrument + ".mp3",
    ];

    var sounds = [];
    for(var i = 0; i < sound_srcs.length; i++) {
        var sound = new Audio(sound_srcs[i]);
        sounds.push(sound);
    }

    return sounds;
}

// Creates html elements corresponding to piano keys based on supplied sounds array.
// Each key is a <div> element with an attached <audio> tag and clickListener.
// Expects a filled array of 13 notes to assign to piano keys (order: C -> B).
// TODO: error checks for supplied array.
function createPiano(sounds) {
    var piano_container = document.getElementById("pianoBlock");

    // Initialize piano key array
    var keys = [];
    for(var i = 0; i < 13; i++) {
        // Create new key div element at keys[i]
        keys.push(document.createElement("div"));
        keys[i].id = i;
        
        // Check if current key is white or black and assigns css class
        if(i == 1 || i == 3 || i == 6 || i == 8 || i == 10) {
            keys[i].className = "black-key";
        } 
        else {
            keys[i].className = "white-key";
        }

        keys[i].addEventListener('click', function(){
            var sound = sounds[this.id];
            sound.currentTime = 0;
            sound.play();
        });

        // Add key element to pianoBlock div
        piano_container.appendChild(keys[i]);
    }
}