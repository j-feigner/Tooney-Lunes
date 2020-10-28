window.onload = getUserInput;

function getUserInput() {
    var button = document.getElementById("button");
    button.addEventListener("click", function() {
        button.remove();
        main();
    });
}

function main() {
    var my_sound = new Audio("https://j-feigner.github.io/Tooney-Lunes/sound_files/drums/kick.mp3");
    my_sound.crossOrigin = "";

    var ctx = new AudioContext();
    var gain_node = ctx.createGain();
    var oscillator = ctx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = 0;

    var volume_control = document.getElementById("volume");
    volume_control.addEventListener("input", function() {
        gain_node.gain.value = this.value;
    });

    var frequency_control = document.getElementById("frequency");
    frequency_control.addEventListener("input", function() {
        oscillator.frequency.value = this.value;
    });

    var play = document.getElementById("play");
    play.addEventListener("click", function() {
        oscillator.connect(gain_node).connect(ctx.destination);
        oscillator.start();
    });
}