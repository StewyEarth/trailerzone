document.addEventListener("DOMContentLoaded",function(){
    var userArray;
    checkusers();
    var register = document.querySelector(".login-register");
    register.addEventListener("submit",function(event){
        event.preventDefault();
        var email = event.target.querySelector(".email");
        var username = event.target.querySelector(".username");
        var password = event.target.querySelector(".password");
        var repeatPassword = event.target.querySelector(".repeat-password");
        if(!checkEmail(email.value)){
            alert("Email error: Make sure you have entered a valid email")
            email.classList.add("wrong-login");
            console.log(email)
            email.focus();
            return false;
        }else{
            if(email.classList.contains("wrong-login")){
                email.classList.remove("wrong-login");
            }
        };
        if(username.value.length < 3){
            alert("Username error: Make sure your username is more than 3 characters");
            username.classList.add("wrong-login");
            username.focus();
            return false;
        }else{
            if(username.classList.contains("wrong-login")){
                username.classList.remove("wrong-login");
            }
        }
        if(password.value.length < 8 || password.value.length > 16){
            alert("password error: Make sure your password between 8 and 16 characters");
            password.classList.add("wrong-login");
            password.focus();
            return false;
        }else{
            if(password.classList.contains("wrong-login")){
                password.classList.remove("wrong-login");
            }
        }
        if(repeatPassword.value != password.value){
            alert("password error: passwords don't seem to match");
            repeatPassword.classList.add("wrong-login");
            repeatPassword.focus();
            return false;
        }else{
            if(repeatPassword.classList.contains("wrong-login")){
                repeatPassword.classList.remove("wrong-login");
            }
        }
        var newuser = {
            email: email.value,
            username: username.value,
            password: password.value,
            usertitle: "Newbie",
            favorites: [],
            recentlyWatched: [],
            profilePicture: "default.png",
            settings: {
                autoplay: true,
            },
        };
        var match = false
        userArray.forEach(user => {
            if(user.username.toLowerCase() == username.value.toLowerCase() || user.email.toLowerCase() == email.value.toLowerCase()){
                match = true;
            }
        });
        if(match == false){
            userArray.push(newuser);
            console.log(userArray)
            localStorage.setItem("users", JSON.stringify(userArray));
            alert("User Registered");
            document.location = ("login.html");
        }else{
            alert("Username or email already exists");
        }

    });

    /**
     * Checks if there is an element called users in localstorage if not it creates it
     */
    function checkusers() {
        if (localStorage.getItem("users") == null) {
            userArray = [];
            localStorage.setItem("users", JSON.stringify(userArray));
            console.log(userArray)
        } else {
            userArray = JSON.parse(localStorage.getItem("users"));
            console.log(userArray)
        }
    }

    function checkEmail(email){
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
});