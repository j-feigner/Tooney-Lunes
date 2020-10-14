

var piano_sounds = createSoundArray("piano");

// Piano Renderer
createPiano(piano_sounds);

// Chord Player
var chord_button = document.getElementById("playChord");

chord_button.addEventListener('click', function() {
    var chord_selection = document.getElementById("chords").selectedIndex;
    playChord(sounds, chord_selection + 12);
});

// Demo Song Player
var beats = [7, 7, 9, null, 7, null, 12, null, 11, null, null, null, 7, 7, 9, null, 7, null, 14, null, 12, null, null, null, 7, 7, 19, null, 16, null, 12, null, 11, null, 9, null, null, null, 17, 17, 16, null, 12, null, 14, null, 12];
var tempo = 120;
var song_button = document.getElementById("playSong");
song_button.addEventListener('click', function() {
    playSong(sounds, beats, tempo);
});

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
	} else if (instrument == 'drums') {
		var drum_srcs = [
			"sound_files/" + instrument + "/hi_hat.mp3",
			"sound_files/" + instrument + "/kick.mp3",
			"sound_files/" + instrument + "/snare.mp3"
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
        } else {
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

function createDrums(sounds) {
	var drum_container = document.getElementById("drumBlock");
	var kit            = drum_container.children;
	
	for(var i = 0; i < kit.length; i++) {
		// Create click listener to play corresponding sound in sounds array
		kit[i].addEventListener('click', function() {
			var drum_sound = this.id;
			var drum       = this;
			var sound      = new Audio("sound_files/drums/" + drum_sound + ".mp3");
		
			// Play audio
			sound.currentTime = 0;
			sound.play();
		});
	}
}

var drum_sounds = createSoundArray("drums");
createDrums(drum_sounds);

function playNote(sounds, selected_key) {


    var note_index = selected_key.id;

    var sound = new Audio;
    
    sound.src = sounds[note_index].src;

    sound.play();
    selected_key.style.backgroundColor = "grey";
    sound.currentTime = 0;

    setTimeout(function(){
        selected_key.style.backgroundColor = "";
    }, 300);

    delete sound;
}

// Plays a three note chord from given array of sounds and a given root note index
function playChord(sounds, root_index) {
    var root_key, third_key, fifth_key;

    var piano = document.getElementById("pianoBlock");
    var degree_selection = document.querySelector("input[name=chord-degree]:checked").value;

    root_key = piano.children[root_index];

    if(degree_selection == "minor") {
        third_key = piano.children[root_index + 3];
    }
    else {
        third_key = piano.children[root_index + 4];
    }

    fifth_key = piano.children[root_index + 7];
    
    playNote(sounds, root_key);
    playNote(sounds, third_key);
    playNote(sounds, fifth_key);
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

function playSong(sounds, beats, tempo) {
    for(var i = 0; i < beats.length; i++) {
        playBeat(sounds, beats[i], tempo, i);
    }
};

function playBeat(sounds, beat, tempo, i) {
    var beat_length = 60000.0 / tempo;
    // Rest beat
    if(beat == null) {
        setTimeout(function() {
        }, tempo * beat_length)
    }
    // Beat with notes
    else {
        var key = document.getElementById(beat);
        setTimeout(function() {
            playNote(sounds, key);
        }, (i * beat_length));
    }
}