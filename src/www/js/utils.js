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

function resizeCanvas2(canvas, container) {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}

// Requests and loads instrument data from server from given instrument name
// Inserts data into destination array within loadSounds()
function loadInstrument(instr_selection, destination, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", "load_instrument.php?name=" + instr_selection);
    req.onload = () => {
        loadSounds(req.responseText, instr_selection, destination, callback);
    }
    req.send();
}

// Callback function for loadInstrument
function loadSounds(path_array, instrument, destination, callback) {
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
                    callback();
                }
            }, (error) => { // Decode failure callback
                alert(error);
            })
        }

        req.send();
    })
}

// Linearly interpolates between two rgb colors and returns an array
// of discrete colors between start_color and end_color
// Expects color parameters to be string in form "rgb(r, g, b)"
function createColorGradient(start_color, end_color, steps) {
    var colors = [];

    var step_size = 1 / steps;

    var regex = /[^\d,]/g; // Finds any character not a digit or comma

    // Array of rgb values as strings
    var start_color_rgb = start_color.replace(regex, '').split(',');
    var end_color_rgb = end_color.replace(regex, '').split(',');

    // Interpolate between start_color and end_color on discrete t steps
    for(var t = 0; t <= 1; t += step_size) {
        var new_color_rgb = [
            (1 - t) * parseInt(start_color_rgb[0]) + t * parseInt(end_color_rgb[0]),
            (1 - t) * parseInt(start_color_rgb[1]) + t * parseInt(end_color_rgb[1]),
            (1 - t) * parseInt(start_color_rgb[2]) + t * parseInt(end_color_rgb[2])
        ];

        var new_color = "rgb(" + 
                        new_color_rgb[0].toString(10) + ", " + 
                        new_color_rgb[1].toString(10) + ", " +
                        new_color_rgb[2].toString(10) + ")";

        colors.push(new_color);
    }

    return colors;
}