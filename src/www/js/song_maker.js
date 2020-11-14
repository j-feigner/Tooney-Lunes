window.onload = main;

function main() {
    var canvas = document.getElementById("gridCanvas");
    resizeCanvas("gridCanvas", "gridContainer");

    var audio_ctx = new AudioContext();

    var test_song = new Song();
    test_song.melody_instrument = "piano";
    test_song.percussion_instrument = "drum";
    test_song.loadInstrument("piano", test_song.melody_sounds);
    test_song.loadInstrument("drum", test_song.percussion_sounds);
}

function Song() {
    this.melody_beat_data = [];
    this.percussion_beat_data = [];

    this.melody_instrument = "";
    this.percussion_instrument = "";

    this.melody_sounds = [];
    this.percussion_sounds = [];

    this.tempo = 120;

    // Requests and loads instrument data from server from given instrument name
    this.loadInstrument = function(instr_selection, destination) {
        var req = new XMLHttpRequest();
        req.open("GET", "load_instrument.php?name=" + instr_selection);
        req.onload = () => {
            this.loadSounds(req.responseText, instr_selection, destination);
        }
        req.send();
    }

    // Callback function for loadInstrument
    this.loadSounds = function(path_array, instrument, destination) {
        var srcs = JSON.parse(path_array);
        var ctx = new AudioContext();

        // Attach path headers to sound sources
        srcs.forEach((sound, index) => {
            srcs[index] = "sounds/" + instrument + "/" + sound;
        })

        // Request and decode arraybuffers for each sound source
        var req_remaining = srcs.length;
        srcs.forEach((sound, index) => {
            var req = new XMLHttpRequest();
            req.open("GET", sound);
            req.responseType = "arraybuffer";

            req.onload = () => {
                var data = req.response;
                ctx.decodeAudioData(data, (buffer) => { // Decode success callback
                    destination[index] = buffer;

                    if(--req_remaining === 0) { // All sounds successfully loaded
                        //alert("All sounds loaded");
                        stopper(this);
                    }
                }, (error) => { // Decode failure callback
                    alert(error);
                })
            }

            req.send();
        })
    }
}

function stopper(test_var) {
    return test_var;
}