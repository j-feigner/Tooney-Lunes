var instrument_dropdown = document.getElementById("instrumentsDropdown");
var piano_button = instrument_dropdown.children[1];
var guitar_button = instrument_dropdown.children[2];
var drum_button = instrument_dropdown.children[3];

var song_maker_button = document.getElementById("songMakerButton");
var profile_button = document.getElementById("userProfileButton");
var logout_img = document.getElementById("logoutImg");

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
    var href = "song_maker.php?song=false";
    window.location = href;
})

profile_button.addEventListener("click", function() {
    var href = "my_profile.php";
    window.location = href;
})

logout_img.addEventListener("click", function () {
    var href = "login.php";
    window.location = href;
})