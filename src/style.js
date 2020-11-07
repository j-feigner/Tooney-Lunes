function profileDetailsSlideIn() {
    var username_container = document.getElementById("usernameContainer");
    var email_container    = document.getElementById("emailContainer");

    var username_width = username_container.offsetWidth;
    var email_width    = email_container.offsetWidth;

    username_container.style.borderBottomRightRadius = "20px";
    email_container.style.borderBottomRightRadius    = "20px";

    if (username_width >= "288")
        username_container.style.borderTopRightRadius = "20px";
    if (email_width >= username_width - 12)
        email_container.style.borderTopRightRadius = "20px";
}

