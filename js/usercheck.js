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
    var pageusername = document.querySelector(".pageusername");
    pageusername.firstChild.textContent = loggedInUser.username;
    var pageUserpicture = document.querySelector(".pageuserpicture");
    pageUserpicture.src = ("assets/img/userpics/" + loggedInUser.profilePicture);
});

