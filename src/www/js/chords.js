window.onload = main;

function main() {
    var url_header = "sounds/piano/";

    var piano_srcs = [
        url_header + "C_3.mp3",
        url_header + "Cs_3.mp3",
        url_header + "D_3.mp3",
        url_header + "Ds_3.mp3",
        url_header + "E_3.mp3",
        url_header + "F_3.mp3",
        url_header + "Fs_3.mp3",
        url_header + "G_3.mp3",
        url_header + "Gs_3.mp3",
        url_header + "A_3.mp3",
        url_header + "As_3.mp3",
        url_header + "B_3.mp3",
        url_header + "C_4.mp3",
        url_header + "Cs_4.mp3",
        url_header + "D_4.mp3",
        url_header + "Ds_4.mp3",
        url_header + "E_4.mp3",
        url_header + "F_4.mp3",
        url_header + "Fs_4.mp3",
        url_header + "G_4.mp3",
        url_header + "Gs_4.mp3",
        url_header + "A_4.mp3",
        url_header + "As_4.mp3",
        url_header + "B_4.mp3",
        url_header + "C_5.mp3",
        url_header + "Cs_5.mp3",
        url_header + "D_5.mp3",
        url_header + "Ds_5.mp3",
        url_header + "E_5.mp3",
        url_header + "F_5.mp3",
        url_header + "Fs_5.mp3",
        url_header + "G_5.mp3",
        url_header + "Gs_5.mp3",
        url_header + "A_5.mp3",
        url_header + "As_5.mp3",
        url_header + "B_5.mp3",
        url_header + "C_6.mp3"
    ];

    var audio_ctx = new AudioContext();
    var sounds = [];

    var req_remaining = piano_srcs.length;
    piano_srcs.forEach((note, index) => {
        var req = new XMLHttpRequest();
        req.open("GET", note);
        req.responseType = "arraybuffer";
        req.onload = function() {
            var buffer_src = req.response;
            audio_ctx.decodeAudioData(buffer_src, 
                function(buffer) { // Decoding success callback
                    sounds[index] = buffer;
                    req_remaining--;
                    if(req_remaining === 0) {
                        alert("All resources loaded.");
                    }
                }, 
                function(error) { // Decoding failure callback
                    alert(error);
                }
            );
        }
        req.send();
    })
}