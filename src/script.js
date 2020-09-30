var sounds = createSoundArray("piano_grand");
createPiano(sounds);

// Fills and returns an array of js Audio objects with correpsonding file locations
// Expects properly formatted instrument string
function createSoundArray(instrument) {
    var sound_srcs = [
        "sound_files/" + "C_5_" + instrument + ".mp3",
        "sound_files/" + "Cs_5_" + instrument + ".mp3",
        "sound_files/" + "D_5_" + instrument + ".mp3",
        "sound_files/" + "Ds_5_" + instrument + ".mp3",
        "sound_files/" + "E_5_" + instrument + ".mp3",
        "sound_files/" + "F_5_" + instrument + ".mp3",
        "sound_files/" + "Fs_5_" + instrument + ".mp3",
        "sound_files/" + "G_5_" + instrument + ".mp3",
        "sound_files/" + "Gs_5_" + instrument + ".mp3",
        "sound_files/" + "A_5_" + instrument + ".mp3",
        "sound_files/" + "As_5_" + instrument + ".mp3",
        "sound_files/" + "B_5_" + instrument + ".mp3",
        "sound_files/" + "C_6" + instrument + ".mp3",
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

        // Create click listener to play corresponding sound in sounds array
        keys[i].addEventListener('click', function(){
            var key = this;
            var sound = sounds[key.id];

            key.style.backgroundColor = "grey";

            // Play audio
            sound.currentTime = 0;
            sound.play();

            // Reset key color after delay
            setTimeout(function(){
                key.style.backgroundColor = "";
            }, 200);
        });

        // Add key element to pianoBlock container
        piano_container.appendChild(keys[i]);
    }
}