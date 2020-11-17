function profileDetailsSlideIn() {
    var username_container = document.getElementById("usernameContainer");
    var email_container = document.getElementById("emailContainer");

    var username_width = username_container.offsetWidth;
    var email_width = email_container.offsetWidth;

    username_container.style.borderBottomRightRadius = "20px";
    email_container.style.borderBottomRightRadius = "20px";

    if (username_width >= "288")
        username_container.style.borderTopRightRadius = "20px";
    if (email_width >= username_width - 12)
        email_container.style.borderTopRightRadius = "20px";
}

var genreExpanded = false;
function showGenreCheckboxes() {
    var genreCheckboxes = document.getElementById("genreCheckboxes");
    if (!genreExpanded) {
        genreCheckboxes.style.display = "block";
        genreExpanded = true;
    } else {
        genreCheckboxes.style.display = "none";
        genreExpanded = false;
    }
}
var instrExpanded = false;
function showInstrCheckboxes() {
    var instrCheckboxes = document.getElementById("instrCheckboxes");
    if (!instrExpanded) {
        instrCheckboxes.style.display = "block";
        instrExpanded = true;
    } else {
        instrCheckboxes.style.display = "none";
        instrExpanded = false;
    }
}
var expExpanded = false;
function showExpCheckboxes() {
    var expCheckboxes = document.getElementById("expCheckboxes");
    if (!expExpanded) {
        expCheckboxes.style.display = "block";
        expExpanded = true;
    } else {
        expCheckboxes.style.display = "none";
        expExpanded = false;
    }
}