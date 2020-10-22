var canvas = createCanvas();
var sounds = createGuitarSoundArray();

drawStrings(canvas);

function createCanvas() {
    var guitar_block = document.getElementById("guitarBlock");
    var canvas = document.createElement("canvas");
    guitar_block.appendChild(canvas);

    canvas.style.height = "600px";
    canvas.style.width = "1000px";
    canvas.style.border = "1px solid black";

    return canvas;
}

function createGuitarSoundArray() {
    var sound_srcs = [
        "sound_files/guitar/1_0_E3.mp3",
        "sound_files/guitar/2_0_A3.mp3",
        "sound_files/guitar/3_0_D4.mp3",
        "sound_files/guitar/4_0_G4.mp3",
        "sound_files/guitar/5_0_B4.mp3",
        "sound_files/guitar/6_0_E5.mp3"
    ];

    var sounds = [];
    for(var i = 0; i < sound_srcs.length; i++) {
        var sound = new Audio(sound_srcs[i]);
        sounds.push(sound);
    }

    return sounds;
}

function drawStrings(canvas) {
    canvas_context = canvas.getContext('2d');
}