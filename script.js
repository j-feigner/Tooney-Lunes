createPiano();

function createPiano() {
    var piano_container = document.getElementById("pianoBlock");

    // Initialize piano key array
    var keys = [];
    for(var i = 0; i < 13; i++) {
        // Create new key div element at keys[i]
        keys.push(document.createElement("div"));
        
        // Check if current key is white or black
        if(i == 1 || i == 3 || i == 6 || i == 8 || i == 10) {
            keys[i].className = "black-key";
        } 
        else {
            keys[i].className = "white-key";
        }
    }

    // Insert piano key div elements into piano container in sequence
    for(var i = 0; i < keys.length; i++) {
        piano_container.appendChild(keys[i]);
    }
}