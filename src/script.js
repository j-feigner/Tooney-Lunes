
var sounds = createSoundArray("piano");

// Piano Renderer
createPiano(sounds);

// Chord Player
var chord_button = document.getElementById("playChord");
chord_button.addEventListener('click', function() {
    var chord_selection = document.getElementById("chords").selectedIndex;
    var degree_selection = document.querySelector("input[name=chord-degree]:checked").value;

    playChord(sounds, chord_selection + 12, degree_selection);
});

var song = {
    beats: [],
    tempo: 120,
    playSong: function() {
        for(var beat = 1; beat <= this.beats.length; beat++) {

        }
    }
};

// Fills and returns an array of js Audio objects with correpsonding file locations / instrument
function createSoundArray(instrument) {
	if (instrument == 'piano') {
		var piano_srcs = [
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
		for(var i = 0; i < piano_srcs.length; i++) {
			var sound = new Audio(piano_srcs[i]);
			sounds.push(sound);
		}
	} else if (insrument == 'drums') {
		var drum_srcs = [
			"sound_files/" + insrument + "/hi_hat.mp3",
			"sound_files/" + insrument + "/kick.mp3",
			"sound_files/" + insrument + "/snare.mp3"
		];
		var sounds = [];
		for(var i = 0; i < drum_srcs.length; i++) {
			var sound = new Audio(drum_srcs[i]);
			sounds.push(sound);
		}
	}

    return sounds;
}

// Creates html elements corresponding to piano keys based on supplied sounds array.
// Each key is a <div> element with an attached clickListener to play corresponding audio.
function createPiano(sounds) {
    var piano_container = document.getElementById("pianoBlock");

    // Initialize piano key array
    var keys = [];
    for(var i = 0; i < sounds.length; i++) {
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
            if(document.getElementById("mode").selectedIndex == 0) {
                playNote(sounds, this);
            }
            else if(document.getElementById("mode").selectedIndex == 1) {
                playClickChord(sounds, this);
            }
        });

        // Add key element to pianoBlock container
        piano_container.appendChild(keys[i]);
    }
}

/*
function createDrums(sounds) {
	var drum_container = document.getElementById("drumBlock");
	
	// Initializes drum kit array
	var kit = [];
	for(var i = 0; i < sounds.length; i++) {
        // Create new drum div element at kit[i]
        kit.push(document.createElement("div"));
        kit[i].id = i;
		if (i == 0) kit[i].style.backgroundColor = "yellow";
		if (i == 1) kit[i].style.backgroundColor = "blue";
		if (i == 2) kit[i].style.backgroundColor = "red";
		
		// Create click listener to play corresponding sound in sounds array
		kit[i].addEventListener('click', function() {
			var drum = this;
			var sound = sounds[drum.id];
		
			drum.style.backgroundColor = "grey";
		
			// Play audio
			sound.currentTime = 0;
			sound.play();
		
			// Reset drum color after delay
			setTimeout(function() {
				drum.style.backgroundColor = "";
			}, 200);
		});
	
		// Add drum element to drumBlock container
		drum_container.appendChild(kit[i]);
	}
}
*/

function playNote(sounds, selected_key) {
    var note_index = selected_key.id;

    var sound = new Audio;
    sound = sounds[note_index];

    sound.play();
    selected_key.style.backgroundColor = "grey";
    sound.currentTime = 0;

    setTimeout(function(){
        selected_key.style.backgroundColor = "";
    }, 200);
}

// Plays a three note chord from given array of sounds and a given root note index
function playChord(sounds, root_index, third_degree) {
    var root_note, third_note, fifth_note;
    var root_key, third_key, fifth_key;
    var piano = document.getElementById("pianoBlock");

    // Assign sounds to given scale degrees (1, 3, 5) and keys
    root_note = sounds[root_index];
    root_key = piano.children[root_index];

    if(third_degree == "major") {
        third_note = sounds[root_index + 4];
        third_key = piano.children[root_index + 4];
    }
    else if (third_degree == "minor") {
        third_note = sounds[root_index + 3];
        third_key = piano.children[root_index + 3];
    }

    fifth_note = sounds[root_index + 7];
    fifth_key = piano.children[root_index + 7];

    // Play tones together and highlight keys
    root_note.play();
    root_key.style.backgroundColor = "grey";
    root_note.currentTime = 0;

    third_note.play();
    third_key.style.backgroundColor = "grey";
    third_note.currentTime = 0;

    fifth_note.play();
    fifth_key.style.backgroundColor = "grey";
    fifth_note.currentTime = 0;

    // Reset key color after delay
    setTimeout(function(){
        root_key.style.backgroundColor = "";
        third_key.style.backgroundColor = "";
        fifth_key.style.backgroundColor = "";
    }, 400);
}

function playClickChord(sounds, selected_key) {
    var root_key, third_key, fifth_key;

    var piano = document.getElementById("pianoBlock");

    var degree_selection = document.querySelector("input[name=chord-degree]:checked").value;

    root_key = piano.children[parseInt(selected_key.id)];

    if(degree_selection == "minor") {
        third_key = piano.children[parseInt(selected_key.id) + 3];
    }
    else {
        third_key = piano.children[parseInt(selected_key.id) + 4];
    }

    fifth_key = piano.children[parseInt(selected_key.id) + 7];
    
    playNote(sounds, root_key);
    playNote(sounds, third_key);
    playNote(sounds, fifth_key);
}
