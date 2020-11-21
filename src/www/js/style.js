function displayUserSearch(searchResults) {
    var searchResultDiv = document.getElementById("searchResult");
    searchResultDiv.classList.add("user-card");

    console.log(searchResults);

    if (!searchResults) {
        searchResultDiv.innerHTML = "No user found.";
    } else {
        var usernameP = document.createElement("p");
        usernameP.innerHTML = searchResults[0][0];
        usernameP.style.margin = "0";

        var emailP = document.createElement("p");
        emailP.innerHTML = searchResults[0][1];
        emailP.style.margin = "0";
        emailP.style.fontSize = ".7em";
        emailP.style.userSelect = "text";
        emailP.style.msUserSelect = "text";
        emailP.style.webkitUserSelect = "text";

        searchResultDiv.appendChild(usernameP);
        searchResultDiv.appendChild(emailP);
    }


//searchResultP.innerHTML = "<h1>Account Details</h1><br>" +
//                            userAccountDetails[0] + "<br>" +
//                            userAccountDetails[1] + "<br>" +
//                            userAccountDetails[2] + "<br>";
//if (userGenres.length != 0) {
//    searchResultP.innerHTML += "<h1>Genre Details</h1><br>";
//    for (var i = 0; i < userGenres.length; i++) {
//        searchResultP.innerHTML += userGenres[i] + "<br>";
//    }
//}
//if (userInstruments.length != 0) {
//    searchResultP.innerHTML += "<h1>Instrument Specialties</h1><br>";
//    for (var i = 0; i < userInstruments.length; i++) {
//        searchResultP.innerHTML += userInstruments[i] + "<br>";
//    }
//}
//if (userExperience.length != 0) {
//    searchResultP.innerHTML += "<h1>Music Experience</h1><br>";
//    for (var i = 0; i < userExperience.length; i++) {
//        searchResultP.innerHTML += userExperience[i] + "<br>";
//    }
//}
}

function setSearchFocusStyle() {
    var searchUserBar = document.getElementById("searchUser");
    var searchContainer = document.getElementById("searchContainer");

    searchUserBar.onfocus = function () {
        searchContainer.style.boxShadow = "3px 3px 4px black";
        searchContainer.style.transform = "translateX(-2px) translateY(-2px)";
        searchContainer.style.transition = "box-shadow .2s ease-out, transform .2s ease-out, border-color .2s ease-out";
        searchContainer.style.borderColor = "#3cbebe";
    }

    searchUserBar.onblur = function () {
        searchContainer.style.boxShadow = "none";
        searchContainer.style.transform = "none";
        searchContainer.style.transition = "box-shadow .5s ease-out, transform .5s ease-out, border-color .2s linear";
        searchContainer.style.borderColor = "black";
    }
}

function searchUserEventListener() {
    var searchUserBar = document.getElementById("searchUser");
    var searchIcon = document.getElementById("searchIcon");

    searchUserBar.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            searchUser();
            searchUserBar.focus();
            searchUserBar.blur();
            socialDisplay();
        }
    });

    searchIcon.addEventListener("click", function () {
        searchUser();
        searchUserBar.blur();
        socialDisplay();
    });

    clearIcon.addEventListener("click", function () {
        searchUserBar.value = "";
        searchUserBar.focus();
        document.getElementById("searchResult").innerHTML = "";
        socialDisplay();
    });
}

function socialDisplay() {
    searchUserBar = document.getElementById("searchUser");
    searchResult = document.getElementById("searchResult");
    otherThings = document.getElementById("otherThings");

    if (searchUserBar.value != "") {
        searchResult.style.display = "block";
        otherThings.style.display = "none";
    } else {
        searchResult.style.display = "none";
        otherThings.style.display = "block";
    }
}

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
function showExpRadios() {
    var expRadios = document.getElementById("expRadios");
    if (!expExpanded) {
        expRadios.style.display = "block";
        expExpanded = true;
    } else {
        expRadios.style.display = "none";
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
