function displayUserSearch(searchResults) {
    var searchResultDiv = document.getElementById("searchResult");
    searchResultDiv.innerHTML = "";
    searchResultDiv.classList.add("user-card");

    if (!searchResults) {
        searchResultDiv.innerHTML = "No user found.";
    } else {
        var usernameA = document.createElement("a");
        usernameA.innerHTML = searchResults[0][0];
        usernameA.id = "userLink";
        usernameA.style.margin = "0";
        usernameA.href = "other_user_profile.php";
        usernameA.style.color = "black";
        usernameA.style.textDecoration = "none";

        usernameA.addEventListener("mouseover", function () {
            usernameA.style.textDecoration = "underline";
        });
        usernameA.addEventListener("mouseout", function () {
            usernameA.style.textDecoration = "none";
        });

        searchResultDiv.appendChild(usernameA);
    }

    var checkBandmateReq = new XMLHttpRequest();
    var method = "GET";
    var url = "checkUserDBBandmates.php?mate_id=" + searchResults[0][2];
    var asynch = true;
    checkBandmateReq.open(method, url, asynch);
    checkBandmateReq.send();

    checkBandmateReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var bandmates = JSON.parse(this.responseText);
            if (bandmates.length == 0) {
                var addFriendSpan = document.createElement("span");
                addFriendSpan.id = "addFriendIcon";
                addFriendSpan.classList.add("material-icons");
                addFriendSpan.classList.add(searchResults[0][2]);
                addFriendSpan.innerHTML = "person_add";
                addFriendSpan.style.position = "absolute";
                addFriendSpan.style.right = "5%";
                addFriendSpan.style.color = "black";
                addFriendSpan.style.cursor = "pointer";
                addFriendSpan.addEventListener("click",
                    updateUserBandmates.bind(null, searchResults[0][2]));
                searchResultDiv.appendChild(addFriendSpan);
            } else {
                var addFriendSpan = document.createElement("span");
                addFriendSpan.id = "remFriendIcon";
                addFriendSpan.classList.add("material-icons");
                addFriendSpan.classList.add(searchResults[0][2]);
                addFriendSpan.innerHTML = "person_remove";
                addFriendSpan.style.position = "absolute";
                addFriendSpan.style.right = "5%";
                addFriendSpan.style.color = "black";
                addFriendSpan.style.cursor = "pointer";
                addFriendSpan.addEventListener("click",
                    updateUserBandmates.bind(null, searchResults[0][2]));
                searchResultDiv.appendChild(addFriendSpan);
            }
        }
    }
}

function displayBandmates(bandmates) {
    var bandmatesMenu = document.getElementById("bandmatesMenu");
    while (bandmatesMenu.lastChild.nodeName == "div") {
        bandmatesMenu.removeChild(bandmatesMenu.lastChild);
    }
    for (var i = 0; i < bandmates.length; i++) {
        var nextBandmateDiv = document.createElement("div");
        nextBandmateDiv.id = bandmates[i]['username'];
        var username = bandmates[i]['username'];
        nextBandmateDiv.addEventListener("click", () => {
            var searchMateReq = new XMLHttpRequest();
            var method = "GET";
            var url = "searchDBBandmate.php?mate_search=" + username;
            var asynch = true;
            searchMateReq.open(method, url, asynch);
            searchMateReq.send();

            searchMateReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var bandmateDetails = JSON.parse(this.responseText);
                    window.location.href = "other_user_profile.php";
                }
            };
        });
        var nextBandmateP = document.createElement("p");
        nextBandmateP.innerHTML = bandmates[i]['username'];
        nextBandmateDiv.appendChild(nextBandmateP);
        bandmatesMenu.appendChild(nextBandmateDiv);
    }
}

function setSearchFocusStyle() {
    var searchUserBar = document.getElementById("searchUser");
    var searchContainer = document.getElementById("searchContainer");
    var searchByList = document.getElementById("searchByList");
    var searchBy = document.getElementById("searchBy");

    searchByList.onfocus = function () {
        searchBy.style.boxShadow = "3px 3px 4px black";
        searchBy.style.transform = "translateX(-2px) translateY(-2px)";
        searchBy.style.transition = "box-shadow .2s ease-out, transform .2s ease-out, border-color .2s ease-out";
        searchBy.style.borderColor = "#3cbebe";
    }

    searchByList.onblur = function () {
        searchBy.style.boxShadow = "none";
        searchBy.style.transform = "none";
        searchBy.style.transition = "box-shadow .5s ease-out, transform .5s ease-out, border-color .2s linear";
        searchBy.style.borderColor = "black";
    }

    searchUserBar.onfocus = function () {
        searchContainer.style.boxShadow = "3px 3px 4px black";
        searchContainer.style.transform = "translateX(-2px) translateY(-2px)";
        searchContainer.style.transition = "box-shadow .2s ease-out, transform .2s ease-out, border-color .2s ease-out";
        searchContainer.style.borderColor = "#3cbebe";
    };

    searchUserBar.onblur = function () {
        searchContainer.style.boxShadow = "none";
        searchContainer.style.transform = "none";
        searchContainer.style.transition = "box-shadow .5s ease-out, transform .5s ease-out, border-color .2s linear";
        searchContainer.style.borderColor = "black";
    };
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
    var username_width = username_container.offsetWidth;
    username_container.style.borderBottomRightRadius = "20px";
    if (username_width >= "288")
        username_container.style.borderTopRightRadius = "20px";

    var email_container = document.getElementById("emailContainer");
    if (email_container != null) {
        var email_width = email_container.offsetWidth;
        email_container.style.borderBottomRightRadius = "20px";
        if (email_width >= username_width - 12)
            email_container.style.borderTopRightRadius = "20px";
    }
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
var bioExpanded = false;
function showBioEditor() {
    var bioInfo = document.getElementById("bioInfo");
    var bioInput = document.getElementById("bioInput");
    var inputLength = bioInput.value.length;
    var bioSubmit = document.getElementById("bioSubmit");
    var wordCount = document.getElementById("wordCount");
    wordCount.innerHTML = inputLength;

    if (!bioExpanded) {
        bioInfo.style.display = "none";
        bioInput.style.display = "block";
        bioSubmit.style.display = "inline-block";
        wordCount.style.display = "inline-block";
        bioExpanded = true;
    } else {
        bioInfo.style.display = "block";
        bioInput.style.display = "none";
        bioSubmit.style.display = "none";
        wordCount.style.display = "none";
        bioExpanded = false;
    }

    bioInput.addEventListener("input", () => {
        inputLength = bioInput.value.length;
        wordCount.innerHTML = inputLength;
    });
}

function noticeFade(notice_type) {
    if (notice_type == "inv_log") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "Invalid login.";
    } else if (notice_type == "taken_u") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "Username taken.";
    } else if (notice_type == "taken_e") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "Email taken.";
    } else if (notice_type == "insert_f") {
        var noticeElm = document.getElementById("error");
        noticeElm.innerHTML = "DB insert fail.";
    } else if (notice_type == "reg_succ") {
        var noticeElm = document.getElementById("success");
        noticeElm.innerHTML = "Registration successful!";
    }
    var currentOpacity = 0;
    var fadeInTimer = setInterval(function () {
        if (currentOpacity >= 0.9) {
            clearInterval(fadeInTimer);
        }
        noticeElm.style.opacity = currentOpacity += 0.1;
    }, 30);
    setTimeout(() => {
        var fadeOutTimer = setInterval(function () {
            if (currentOpacity <= 0) {
                clearInterval(fadeOutTimer);
            }
            noticeElm.style.opacity = currentOpacity -= 0.1;
        }, 30);
    }, 5000);
}

function bandmateMenuStyle() {
    document.addEventListener("click", openCloseBandmates);
}

var menuExpanded = false;
function openCloseBandmates(event) {
    var bandmateMenu = document.getElementById("bandmatesMenu");
    var XY = bandmateMenu.getBoundingClientRect();

    if ((event.clientX > (XY.left - 50) && event.clientX < XY.left) &&
        (event.clientY > XY.top && event.clientY < (XY.top + 50))) {
        if (!menuExpanded) {
            var currentPos = -15;
            var slideInTimer = setInterval(function () {
                if (currentPos >= -0.5) {
                    clearInterval(slideInTimer);
                }
                bandmateMenu.style.right = (currentPos += 0.5) + "%";
            }, 15);
            menuExpanded = true;
        } else {
            var currentPos = 0;
            var slideOutTimer = setInterval(function () {
                if (currentPos <= -14.5) {
                    clearInterval(slideOutTimer);
                }
                bandmateMenu.style.right = (currentPos -= 0.5) + "%";
            }, 15);
            menuExpanded = false;
        }
    }
}