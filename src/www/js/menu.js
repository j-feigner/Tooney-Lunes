var instrument_dropdown = document.getElementById("instrumentsDropdown");
var piano_button = instrument_dropdown.children[1];
var guitar_button = instrument_dropdown.children[2];
var drum_button = instrument_dropdown.children[3];

var song_maker_button = document.getElementById("songMakerButton");
var profile_button = document.getElementById("userProfileButton");

piano_button.addEventListener("click", function() {
    var href = "piano.php";
    window.location = href;
})

guitar_button.addEventListener("click", function() {
    var href = "guitar.php";
    window.location = href;
})

drum_button.addEventListener("click", function() {
    var href = "drum.php";
    window.location = href;
})

song_maker_button.addEventListener("click", function() {
    var href = "song.php";
    window.location = href;
})

profile_button.addEventListener("click", function() {
    var href = "my_profile.php";
    window.location = href;
})