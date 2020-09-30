var sounds = createSoundArray("piano");
createPiano(sounds);

// Fills and returns an array of js Audio objects with correpsonding file locations
// Expects properly formatted instrument string
function createSoundArray(instrument) {
    var sound_srcs = [
        "sound_files/" + instrument + "/C_3.mp3",
        "sound_files/" + instrument + "/Cs_3.mp3",
        "sound_files/" + instrument + "/D_3.mp3",
        "sound_files/" + instrument + "/Ds_3.mp3",
        "sound_files/" + instrument + "/E_3.mp3",
        "sound_files/" + instrument + "/F_3.mp3",
        "sound_files/" + instrument + "/Fs_3.mp3",
        "sound_files/" + instrument + "/G_3.mp3",
        "sound_files/" + instrument + "/Gs_3.mp3",
        "sound_files/" + instrument + "/A_3.mp3",
        "sound_files/" + instrument + "/As_3.mp3",
        "sound_files/" + instrument + "/B_3.mp3",
        "sound_files/" + instrument + "/C_4.mp3",
        "sound_files/" + instrument + "/Cs_4.mp3",
        "sound_files/" + instrument + "/D_4.mp3",
        "sound_files/" + instrument + "/Ds_4.mp3",
        "sound_files/" + instrument + "/E_4.mp3",
        "sound_files/" + instrument + "/F_4.mp3",
        "sound_files/" + instrument + "/Fs_4.mp3",
        "sound_files/" + instrument + "/G_4.mp3",
        "sound_files/" + instrument + "/Gs_4.mp3",
        "sound_files/" + instrument + "/A_4.mp3",
        "sound_files/" + instrument + "/As_4.mp3",
        "sound_files/" + instrument + "/B_4.mp3",
        "sound_files/" + instrument + "/C_5.mp3",
        "sound_files/" + instrument + "/Cs_5.mp3",
        "sound_files/" + instrument + "/D_5.mp3",
        "sound_files/" + instrument + "/Ds_5.mp3",
        "sound_files/" + instrument + "/E_5.mp3",
        "sound_files/" + instrument + "/F_5.mp3",
        "sound_files/" + instrument + "/Fs_5.mp3",
        "sound_files/" + instrument + "/G_5.mp3",
        "sound_files/" + instrument + "/Gs_5.mp3",
        "sound_files/" + instrument + "/A_5.mp3",
        "sound_files/" + instrument + "/As_5.mp3",
        "sound_files/" + instrument + "/B_5.mp3",
        "sound_files/" + instrument + "/C_6.mp3"
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
    for(var i = 0; i < 37; i++) {
        // Create new key div element at keys[i]
        keys.push(document.createElement("div"));
        keys[i].id = i;
        
        // Check if current key is white or black and assigns css class
        if( i == 1  || 
            i == 3  || 
            i == 6  || 
            i == 8  || 
            i == 10 ||
            i == 13 ||
            i == 15 ||
            i == 18 ||
            i == 20 ||
            i == 22 ||
            i == 25 ||
            i == 27 ||
            i == 30 ||
            i == 32 ||
            i == 34) {
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