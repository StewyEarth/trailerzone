document.addEventListener("DOMContentLoaded", function () {
    var titleItems = document.querySelectorAll(".gallery-item");
    var gallery = document.querySelector(".gallery");
    var favoritesArray;

    checkFavorites();

    function checkFavorites() {
        if (localStorage.getItem("favorites") == null) {
            favoritesArray = [];
            localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        } else {
            favoritesArray = JSON.parse(localStorage.getItem("favorites"));
        }
    }
    updatetitles();
    /**
     * checks if each element is present in the favorites array, and then adds the hearts if it is.
     */
    function updatetitles() {
        checkFavorites();
        titleItems.forEach(titleitem => {
            var title = titleitem.querySelector(".mediatitle").textContent;
            var favoritebutton = titleitem.querySelector(".gallery-favorite");
            var buttonI = titleitem.querySelector(".fa-heart");
            favoritesArray.forEach(favorite => {
                if (title == favorite) {
                    buttonI.classList.replace("far", "fas")
                    favoritebutton.classList.add("visible");
                }
            });
        });
    }
    /**
     * Checks if empty heart or filled heart is clicked and fires the coresponding function.
     */
    gallery.addEventListener("click", function (event) {
        if (event.target.classList.contains("gallery-favorite")) {
            var buttonI = event.target.firstChild;
            event.preventDefault();
            if (!buttonI.classList.contains("fas")) {
                buttonI.classList.replace("far", "fas")
                addToFavorites(event);
            } else {
                buttonI.classList.replace("fas", "far");
                removeFromFavorites(event);
            }
        } else if (event.target.offsetParent.classList.contains("gallery-item") && !event.target.classList.contains("gallery-favorite")) {
            // event.preventDefault();
            AddRecentlyWatched(event);
        }
    });
    /**
     * 
     * @param {string} event - Adds an item to the favorite array if it's not a duplicate
     */
    function addToFavorites(event) {
        var title = event.target.offsetParent.querySelector(".mediatitle").textContent
        var titlediv = event.target.offsetParent;
        var favoritebutton = titlediv.querySelector(".gallery-favorite");
        var duplicate = false
        checkFavorites();
        favoritesArray = JSON.parse(localStorage.getItem("favorites"));
        favoritesArray.forEach(favorite => {
            if (favorite == title) {
                duplicate = true;
            }
        });
        if (duplicate == false) {
            favoritebutton.classList.add("visible");
            favoritesArray.unshift(title);
            localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        }
    };
    /**
     * 
     * @param {string} event - removes the element from the array, and then pushes the array to the localstorage 
     */
    function removeFromFavorites(event) {
        var title = event.target.offsetParent.querySelector(".mediatitle").textContent
        var titlediv = event.target.offsetParent;
        var favoritebutton = titlediv.querySelector(".gallery-favorite");
        favoritesArray.forEach((favorite, index) => {
            if (favorite == title) {
                favoritebutton.classList.remove("visible");
                favoritesArray.splice(index, 1);
                localStorage.setItem("favorites", JSON.stringify(favoritesArray));
            }
        });
    }

    //Omskriv til at få til at virke som recently watched
    checkRecentlyWatched();
    var recentlyWatched;

    /**
     * 
     * @param {string} event - checks if there is a duplicate of the title in the local storage and removes it, then adds the title. otherwise it just adds the item to the array
     */
    function AddRecentlyWatched(event) {
        var title = event.target.offsetParent.querySelector(".mediatitle").textContent
        checkRecentlyWatched();
        recentlyWatched = JSON.parse(localStorage.getItem("recentlyWatched"));
        recentlyWatched.forEach((recent, index) => {
            if (recent == title) {
                recentlyWatched.splice(index, 1);
                localStorage.setItem("recentlyWatched", JSON.stringify(recentlyWatched));
            }
        });
        recentlyWatched.unshift(title);
        localStorage.setItem("recentlyWatched", JSON.stringify(recentlyWatched));
        console.log(recentlyWatched)
    };

        /**
     * 
     * @param {string} event - Adds an item to the favorite array if it's not a duplicate
     */
    function checkRecentlyWatched() {
        if (localStorage.getItem("recentlyWatched") == null) {
            recentlyWatched = [];
            localStorage.setItem("recentlyWatched", JSON.stringify(recentlyWatched));
        } else {
            recentlyWatched = JSON.parse(localStorage.getItem("recentlyWatched"));
        }
    }
});