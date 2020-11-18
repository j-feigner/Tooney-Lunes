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
            } else {
                newUserGenreInfo = "";
                for (var i = 0; i < userGenreDataLength; i++) {
                    if ((i + 1) == userGenreDataLength) {
                        newUserGenreInfo += userGenreData[i]['genre_title'];
                    } else {
                        newUserGenreInfo += userGenreData[i]['genre_title'] + ", ";
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
                submitButton.className = "info-submit";
                submitButton.innerHTML = "Submit";

                genreCheckboxDiv.appendChild(newLabel);
            }
            genreCheckboxDiv.appendChild(submitButton);
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
            } else {
                newUserInstrInfo = "";
                for (var i = 0; i < userInstrDataLength; i++) {
                    if ((i + 1) == userInstrDataLength) {
                        newUserInstrInfo += userInstrData[i]['instr_name'];
                    } else {
                        newUserInstrInfo += userInstrData[i]['instr_name'] + ", ";
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
                submitButton.className = "info-submit";
                submitButton.innerHTML = "Submit";

                instrCheckboxDiv.appendChild(newLabel);
            }
            instrCheckboxDiv.appendChild(submitButton);
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
            } else if (userExpDataLength == 1) {
                newUserExpInfo = userExpData[0]['exp_title'];
            } else {
                newUserExpInfo = "";
                for (var i = 0; i < userExpDataLength; i++) {
                    if ((i + 1) == userExpDataLength) {
                        newUserExpInfo += userExpData[i]['exp_title'];
                    } else {
                        newUserExpInfo += userExpData[i]['exp_title'] + ", ";
                    }
                }
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

            var expCheckboxDiv = document.getElementById("expCheckboxes");
            for (var i = 0; i < expDataLength; i++) {
                var newInput = document.createElement("input");
                newInput.setAttribute("type", "checkbox");
                newInput.id = expData[i]["exp_title"].toLowerCase();
                newInput.name = expData[i]["exp_title"].toLowerCase();
                newInput.value = expData[i]["exp_title"];

                var newLabel = document.createElement("label");
                newLabel.setAttribute("for", newInput.id);
                newLabel.innerHTML = expData[i]["exp_title"];
                newLabel.appendChild(newInput);

                var submitButton = document.createElement("button");
                submitButton.setAttribute("type", "button");
                submitButton.setAttribute("onclick", "updateExperience()");
                submitButton.className = "info-submit";
                submitButton.innerHTML = "Submit";

                expCheckboxDiv.appendChild(newLabel);
            }
            expCheckboxDiv.appendChild(submitButton);
        }
    }
}