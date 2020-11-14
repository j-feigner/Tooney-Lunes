// Checks if x,y pair falls within bounds of rect object
// Expects rect = {x: , y: , w: , h: };
function isInBounds(x, y, rect) {
    var x_lower = rect.x
    var x_upper = rect.x + rect.w;
    var y_lower = rect.y;
    var y_upper = rect.y + rect.h;
    if(x > x_lower && x < x_upper && y > y_lower && y < y_upper) {
        return true;
    } else {
        return false;
    }
}

// Resizes canvas to container size, ensures proper rendering
// Use this instead of setting canvas width/height in CSS
function resizeCanvas(canvas_name, container_name) {
    var container = document.getElementById(container_name);
    var canvas = document.getElementById(canvas_name);
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}

// Requests and loads instrument data from server from given instrument name
// Inserts data into destination array within loadSounds()
loadInstrument = function(instr_selection, destination) {
    var req = new XMLHttpRequest();
    req.open("GET", "load_instrument.php?name=" + instr_selection);
    req.onload = () => {
        loadSounds(req.responseText, instr_selection, destination);
    }
    req.send();
}

// Callback function for loadInstrument
loadSounds = function(path_array, instrument, destination) {
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
                    var stopper = 0;
                }
            }, (error) => { // Decode failure callback
                alert(error);
            })
        }

        req.send();
    })
}