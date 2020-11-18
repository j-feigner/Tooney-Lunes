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

function noticeFadeIn(notice_type) {
    var noticeElm;
    if (notice_type == "inv_log") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "Invalid login.";
    } else if (notice_type == "taken_u") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "Taken username.";
    } else if (notice_type == "taken_e") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "Taken email.";
    } else if (notice_type == "insert_f") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "DB insert fail.";
    } else if (notice_type == "reg_succ") {
        var noticeElm = document.getElementById("success");
        noticeElm.innerHTML = "Registration successful.";
    }
    var initOpacity = 0;
    var timer = setInterval(function () {
        if (initOpacity >= 0.9) {
            clearInterval(timer);
        }
        noticeElm.style.opacity = initOpacity += 0.1;
    }, 30);
}
