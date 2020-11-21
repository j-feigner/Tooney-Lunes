function updateGenres() {
    var genreCheckboxDiv = document.getElementById("genreCheckboxes");
    var checkedGenres = [];
    for (var i = 0; i < genreCheckboxDiv.children.length; i++) {
        var currentCheckbox = genreCheckboxDiv.children[i].firstElementChild;
        if (currentCheckbox == null) {
            // pass
        } else if (currentCheckbox.checked) {
            checkedGenres.push(currentCheckbox.value);
        }
    }

    var updateGenreReq = new XMLHttpRequest();
    var method = "GET";
    var url = "updateDBGenres.php";
    if (checkedGenres.length > 0) {
        for (var i = 0; i < checkedGenres.length; i++) {
            if (i == 0) {
                url += "?" + i + "=" + encodeURIComponent(checkedGenres[i]);
            } else {
                url += "&" + i + "=" + encodeURIComponent(checkedGenres[i]);
            }
        }
    }
    var asynch = true;
    updateGenreReq.open(method, url, asynch);
    updateGenreReq.send();

    updateGenreReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var signal = this.responseText;
            populateUserGenres();
            document.getElementById("genreSettings").click();
        }
    }
}

function populateUserGenres() {
    var userGenreReq = new XMLHttpRequest();
    var method = "GET";
    var url = "getUserDBGenres.php";
    var asynch = true;
    userGenreReq.open(method, url, asynch);
    userGenreReq.send();

    userGenreReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userGenreData = JSON.parse(this.responseText);
            var userGenreDataLength = Object.keys(userGenreData).length

            if (userGenreDataLength == 0) {
                newUserGenreInfo = "";
            } else if (userGenreDataLength == 1) {
                newUserGenreInfo = userGenreData[0]['genre_title'];
                document.getElementById(userGenreData[0]['genre_title'].toLowerCase()).checked = true;
            } else {
                newUserGenreInfo = "";
                for (var i = 0; i < userGenreDataLength; i++) {
                    if ((i + 1) == userGenreDataLength) {
                        newUserGenreInfo += userGenreData[i]['genre_title'];
                        document.getElementById(userGenreData[i]['genre_title'].toLowerCase()).checked = true;
                    } else {
                        newUserGenreInfo += userGenreData[i]['genre_title'] + ", ";
                        document.getElementById(userGenreData[i]['genre_title'].toLowerCase()).checked = true;
                    }
                }
            }
            document.getElementById("genreInfo").innerHTML = newUserGenreInfo;
        }
    }
}

function populateGenres() {
    var genreReq = new XMLHttpRequest();
    var method = "GET";
    var url = "getDBGenres.php";
    var asynch = true;
    genreReq.open(method, url, asynch);
    genreReq.send();

    genreReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var genreData = JSON.parse(this.responseText);
            var genreDataLength = Object.keys(genreData).length

            var genreCheckboxDiv = document.getElementById("genreCheckboxes");
            for (var i = 0; i < genreDataLength; i++) {
                var newInput = document.createElement("input");
                newInput.setAttribute("type", "checkbox");
                newInput.id = genreData[i]["genre_title"].toLowerCase();
                newInput.name = genreData[i]["genre_title"].toLowerCase();
                newInput.value = genreData[i]["genre_title"];

                var newLabel = document.createElement("label");
                newLabel.setAttribute("for", newInput.id);
                newLabel.innerHTML = genreData[i]["genre_title"];
                newLabel.appendChild(newInput);

                var submitButton = document.createElement("button");
                submitButton.setAttribute("type", "button");
                submitButton.setAttribute("onclick", "updateGenres()");
                submitButton.id = "genreSubmit";
                submitButton.className = "info-submit";
                submitButton.innerHTML = "Submit";

                genreCheckboxDiv.appendChild(newLabel);
            }
            genreCheckboxDiv.appendChild(submitButton);
        }
    }
}

function updateInstruments() {
    var instrCheckboxDiv = document.getElementById("instrCheckboxes");
    var checkedInstruments = [];
    for (var i = 0; i < instrCheckboxDiv.children.length; i++) {
        var currentCheckbox = instrCheckboxDiv.children[i].firstElementChild;
        if (currentCheckbox == null) {
            // pass
        } else if (currentCheckbox.checked) {
            checkedInstruments.push(currentCheckbox.value);
        }
    }

    var updateInstrReq = new XMLHttpRequest();
    var method = "GET";
    var url = "updateDBInstruments.php";
    if (checkedInstruments.length > 0) {
        for (var i = 0; i < checkedInstruments.length; i++) {
            if (i == 0) {
                url += "?" + i + "=" + encodeURIComponent(checkedInstruments[i]);
            } else {
                url += "&" + i + "=" + encodeURIComponent(checkedInstruments[i]);
            }
        }
    }
    var asynch = true;
    updateInstrReq.open(method, url, asynch);
    updateInstrReq.send();

    updateInstrReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var signal = this.responseText;
            populateUserInstruments();
            document.getElementById("instrSettings").click();
        }
    }
}

function populateUserInstruments() {
    var userInstrReq = new XMLHttpRequest();
    var method = "GET";
    var url = "getUserDBInstruments.php";
    var asynch = true;
    userInstrReq.open(method, url, asynch);
    userInstrReq.send();

    userInstrReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userInstrData = JSON.parse(this.responseText);
            var userInstrDataLength = Object.keys(userInstrData).length

            if (userInstrDataLength == 0) {
                newUserInstrInfo = "";
            } else if (userInstrDataLength == 1) {
                newUserInstrInfo = userInstrData[0]['instr_name'];
                document.getElementById(userInstrData[0]["instr_name"].toLowerCase()).checked = true;
            } else {
                newUserInstrInfo = "";
                for (var i = 0; i < userInstrDataLength; i++) {
                    if ((i + 1) == userInstrDataLength) {
                        newUserInstrInfo += userInstrData[i]['instr_name'];
                        document.getElementById(userInstrData[i]["instr_name"].toLowerCase()).checked = true;
                    } else {
                        newUserInstrInfo += userInstrData[i]['instr_name'] + ", ";
                        document.getElementById(userInstrData[i]["instr_name"].toLowerCase()).checked = true;
                    }
                }
            }
            document.getElementById("instrInfo").innerHTML = newUserInstrInfo;
        }
    }
}

function populateInstruments() {
    var instrReq = new XMLHttpRequest();
    var method = "GET";
    var url = "getDBInstruments.php";
    var asynch = true;
    instrReq.open(method, url, asynch);
    instrReq.send();

    instrReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var instrData = JSON.parse(this.responseText);
            var instrDataLength = Object.keys(instrData).length

            var instrCheckboxDiv = document.getElementById("instrCheckboxes");
            for (var i = 0; i < instrDataLength; i++) {
                var newInput = document.createElement("input");
                newInput.setAttribute("type", "checkbox");
                newInput.id = instrData[i]["instr_name"].toLowerCase();
                newInput.name = instrData[i]["instr_name"].toLowerCase();
                newInput.value = instrData[i]["instr_name"];

                var newLabel = document.createElement("label");
                newLabel.setAttribute("for", newInput.id);
                newLabel.innerHTML = instrData[i]["instr_name"];
                newLabel.appendChild(newInput);

                var submitButton = document.createElement("button");
                submitButton.setAttribute("type", "button");
                submitButton.setAttribute("onclick", "updateInstruments()");
                submitButton.id = "instrumentSubmit";
                submitButton.className = "info-submit";
                submitButton.innerHTML = "Submit";

                instrCheckboxDiv.appendChild(newLabel);
            }
            instrCheckboxDiv.appendChild(submitButton);
        }
    }
}

function updateExperience() {
    var expRadiosDiv = document.getElementById("expRadios");
    var checkedExperience;
    for (var i = 0; i < expRadiosDiv.children.length; i++) {
        var currentRadio = expRadiosDiv.children[i].firstElementChild;
        if (currentRadio == null) {
            console.log(currentRadio.nodeName);
            // pass
        } else if (currentRadio.checked) {
            checkedExperience = currentRadio.value;
            break;
        }
    }

    var updateExpReq = new XMLHttpRequest();
    var method = "GET";
    var url = "updateDBExperience.php";
    if (typeof checkedExperience !== "undefined") {
        url += "?exp_title=" + encodeURIComponent(checkedExperience);
    }
    var asynch = true;
    updateExpReq.open(method, url, asynch);
    updateExpReq.send();

    updateExpReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var signal = this.responseText;
            populateUserExperience();
            document.getElementById("expSettings").click();
        }
    }
}

function populateUserExperience() {
    var userExpReq = new XMLHttpRequest();
    var method = "GET";
    var url = "getUserDBExperience.php";
    var asynch = true;
    userExpReq.open(method, url, asynch);
    userExpReq.send();

    userExpReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var userExpData = JSON.parse(this.responseText);
            var userExpDataLength = Object.keys(userExpData).length

            if (userExpDataLength == 0) {
                newUserExpInfo = "";
            } else {
                newUserExpInfo = userExpData[0]['exp_title'];
                document.getElementById(userExpData[0]['exp_title'].toLowerCase()).checked = true;
            }
            document.getElementById("expInfo").innerHTML = newUserExpInfo;
        }
    }
}

function populateExperience() {
    var expReq = new XMLHttpRequest();
    var method = "GET";
    var url = "getDBExperience.php";
    var asynch = true;
    expReq.open(method, url, asynch);
    expReq.send();

    expReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var expData = JSON.parse(this.responseText);
            var expDataLength = Object.keys(expData).length

            var expRadioDiv = document.getElementById("expRadios");
            for (var i = 0; i < expDataLength; i++) {
                var newInput = document.createElement("input");
                newInput.setAttribute("type", "radio");
                newInput.id = expData[i]["exp_title"].toLowerCase();
                newInput.name = "experience";
                newInput.value = expData[i]["exp_title"];

                var newLabel = document.createElement("label");
                newLabel.setAttribute("for", newInput.id);
                newLabel.innerHTML = expData[i]["exp_title"];
                newLabel.appendChild(newInput);

                var submitButton = document.createElement("button");
                submitButton.setAttribute("type", "button");
                submitButton.setAttribute("onclick", "updateExperience()");
                submitButton.id = "experienceSubmit";
                submitButton.className = "info-submit";
                submitButton.innerHTML = "Submit";

                expRadioDiv.appendChild(newLabel);
            }
            expRadioDiv.appendChild(submitButton);
        }
    }
}

function searchUser() {
    if (document.getElementById("searchUser").value == "") return;

    var searchUserReq = new XMLHttpRequest();
    var method = "GET";
    var url = "searchDBUser.php?search=" + document.getElementById("searchUser").value;
    var asynch = true;
    searchUserReq.open(method, url, asynch);
    searchUserReq.send();

    searchUserReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var searchResult = JSON.parse(this.responseText);
            var searchResultLength = Object.keys(searchResult).length;

            localStorage.removeItem("userSearchData");
            if (searchResultLength != 0) {
                var userGenres = [];
                var userInstruments = [];
                var userExperience = [];
                var userAccountDetails = [searchResult[0]['username'],
                                            searchResult[0]['email'],
                                            searchResult[0]['user_id']];
                if (searchResultLength > 1) {
                    for (var i = 1; i < searchResultLength; i++) {
                        var currentKey = Object.keys(searchResult[i])[0];
                        if (currentKey == "genre_title") {
                            userGenres.push(searchResult[i][currentKey]);
                        } else if (currentKey == "instr_name") {
                            userInstruments.push(searchResult[i][currentKey]);
                        } else if (currentKey == "exp_title") {
                            userExperience.push(searchResult[i][currentKey]);
                        }
                    }
                }
                displayUserSearch([userAccountDetails, userGenres, userInstruments, userExperience]);
            } else {
                displayUserSearch(false);
            }
        }
    };
}