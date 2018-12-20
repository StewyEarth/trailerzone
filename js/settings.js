document.addEventListener("DOMContentLoaded", function () {
    var userArray;
    var loggedInUser;
    checkusers();
    checkUserLogin();

    var titleInput = document.querySelector(".usertitle");
    var emailInput = document.querySelector(".useremail");
    var autoplaySelect = document.querySelector(".autoplayselect");
    updateSettings();

    /**
     * Checks if the user is logged in
     */
    function checkUserLogin() {
        if (sessionStorage.getItem("loggedInUser") != null) {
            loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        };
    };

    /**checks if the titleinput length is 1 character or more and then changes the title */
    var titleChangeForm = document.querySelector(".change-title");
    titleChangeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (titleInput.value.length > 0) {
            loggedInUser.usertitle = titleInput.value;
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            console.log(loggedInUser.usertitle)
            updateProfileUserInfo();
            updateLocalUserInfo();
            alert("Title changed");
        } else {
            alert("Please enter 1 or more characters")
            titleInput.focus();
        }
    });

    /**checks if the titleinput length is 1 character or more and then changes the title */
    var emailChangeForm = document.querySelector(".change-email");
    emailChangeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var emailmatch = false
        if (checkEmail(emailInput.value)) {
            userArray.forEach(user => {
                if(emailInput.value == user.email){
                    emailmatch = true
                }
            });
            if(emailmatch == false){
                loggedInUser.email = emailInput.value;
                sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                updateProfileUserInfo();
                updateLocalUserInfo();
                alert("Email changed");
            }else{
                alert("Email is already in use");
                emailInput.focus();
            }
        } else {
            alert("Please enter a valid email")
            emailInput.focus();
        }
    });

    /**
     * Updates settings panels with already known user info
     */
    function updateSettings() {
        emailInput.value = loggedInUser.email;
        titleInput.value = loggedInUser.usertitle;
        autoplaySelect.value = loggedInUser.settings.autoplay;
    }

    /**
     * Updates user info on the profile page
     */
    function updateProfileUserInfo() {
        var profileusername = document.querySelector(".profile-username");
        profileusername.firstChild.textContent = loggedInUser.username;
        var profileUserTitle = document.querySelector(".profile-usertitle");
        profileUserTitle.firstChild.textContent = loggedInUser.usertitle;
        var profileUserpicture = document.querySelector(".profile-userpicture");
        profileUserpicture.src = ("assets/img/userpics/" + loggedInUser.profilePicture);
    }

    /**
     * Updates info in localstorage
     */
    function updateLocalUserInfo() {
        userArray.forEach((user, index) => {
            if (user.username == loggedInUser.username) {
                userArray.splice(index, 1);
                userArray.push(loggedInUser);
                localStorage.setItem("users", JSON.stringify(userArray));
            }
        });
    };

    /**
     * Checks if there is an element called users in localstorage if not it creates it
     */
    function checkusers() {
        if (localStorage.getItem("users") == null) {
            userArray = [];
            localStorage.setItem("users", JSON.stringify(userArray));
        } else {
            userArray = JSON.parse(localStorage.getItem("users"));
        }
    }

    function checkEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
});