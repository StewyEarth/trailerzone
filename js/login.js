document.addEventListener("DOMContentLoaded", function () {
    var userArray;
    checkusers();
    var loginform = document.querySelector(".login-register");
    loginform.addEventListener("submit", function (event) {
        event.preventDefault();
        var username = event.target.querySelector(".username");
        var password = event.target.querySelector(".password");
        var usermatch = false;
        userArray.forEach(user => {
            if (username.value.toLowerCase() == user.username.toLowerCase() && password.value == user.password) {
                usermatch = true;
                checkuserinfo(user);
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                document.location = ("index.html");
            } else if (username.value.toLowerCase() == user.email.toLowerCase() && password.value == user.password) {
                usermatch = true;
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                document.location = ("index.html");
            };
        });
        if (usermatch == false){
            alert("There seems to be a problem with either your username or password");
        }
    });
    /**
     * Cheks if the user has the needed properties
     */
    function checkuserinfo(checkuser){
        var newuser = {
            usertitle: "Newbie",
            favorites: [],
            recentlyWatched: [],
            profilePicture: "default.png",
            settings: {
                autoplay: true,
            },
        };
        if(!checkuser.hasOwnProperty("usertitle")){
            checkuser.usertitle = newuser.usertitle;
        }
        if (!checkuser.hasOwnProperty("favorites")){
            checkuser.favorites = newuser.favorites;
        }
        if (!checkuser.hasOwnProperty("recentlyWatched")){
            checkuser.recentlyWatched = newuser.recentlyWatched;
        }
        if (!checkuser.hasOwnProperty("profilePicture")){
            checkuser.profilePicture = newuser.profilePicture;
        }else if (checkuser.profilePicture == ""){
            checkuser.profilePicture = newuser.profilePicture;
        }
        if (!checkuser.hasOwnProperty("settings")){
            checkuser.settings = newuser.settings;
        }
        userArray.forEach((user, index) => {
            if(user.username == checkuser.username){
                userArray.splice(index,1);
                userArray.push(checkuser);
                localStorage.setItem("users", JSON.stringify(userArray));
            }
        });
    }
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
    console.log(userArray);
});