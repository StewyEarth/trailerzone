document.addEventListener("DOMContentLoaded", function () {
    var loggedInUser;
    checkUserLogin();
    var logout = document.querySelector(".logout");
    logout.addEventListener("click",logUserOut)
    /**
     * Loggs the user out by removing session storage
     */
    function logUserOut(){
        sessionStorage.removeItem("loggedInUser");
    };
    function checkUserLogin() {
        if (sessionStorage.getItem("loggedInUser") == null) {
            document.location = ("login.html");
        } else {
            loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        }
    };
    updateProfileUserInfo();
    function updateProfileUserInfo(){
        var profileusername = document.querySelector(".profile-username");
        profileusername.firstChild.textContent = loggedInUser.username;
        var profileUserTitle = document.querySelector(".profile-usertitle");
        profileUserTitle.firstChild.textContent = loggedInUser.usertitle;
        var profileUserpicture = document.querySelector(".profile-userpicture");
        profileUserpicture.src = ("assets/img/userpics/" + loggedInUser.profilePicture);
    }
});