document.addEventListener("DOMContentLoaded", function () {
    var sortedItems = [];
    var gallery = document.querySelector(".gallery");
    var dropdownmenu = document.querySelector(".dropdowntitles");
    var pagetitle = document.querySelector(".pagetitle");
    var urlparams = new URLSearchParams(window.location.search);
    var sorting = urlparams.get("sorting");
    checkSearchParams();
    /**
     * Checks search paramaters and makes the currentpage blue and sorts 
     */
    function checkSearchParams() {
        var dropDownmenuItems = document.querySelectorAll(".dropdowntitles li a");
        if (sorting != null) {
            sorting = sorting.replace("_", " ");
            sortItems(sorting);
            pagetitle.textContent = sorting;
            dropDownmenuItems.forEach(Dropdownitem => {
                var itemText = Dropdownitem.firstChild.nextSibling;
                itemText = itemText.textContent.toLowerCase();
                if (sorting == itemText) {
                    Dropdownitem.classList.add("text--lightblue");
                    dropdownmenu.style.display = "flex";
                };
            });
            var navitems = document.querySelectorAll(".linktext");
            navitems.forEach(navitem => {
                var navText = navitem.textContent;
                navText = navText.toLowerCase();
                if (sorting == navText) {
                    navitem.classList.add("text--lightblue");
                };
            });

        } else if (sorting == null) {
            dropDownmenuItems[0].classList.add("text--lightblue")
            dropdownmenu.style.display = "flex";
        }

    }

    var favoritesArray;
    checkFavorites();

    /**
     * Checks if there is a Favorites variable in localstorage otherwise it creates it
     */
    function checkFavorites() {
        if (localStorage.getItem("favorites") == null) {
            favoritesArray = [];
            localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        } else {
            favoritesArray = JSON.parse(localStorage.getItem("favorites"));
        }
    }
    /**
     * Checks if there is a recentlyWatched variable in localstorage otherwise it creates it
     */
    function checkRecentlyWatched() {
        if (localStorage.getItem("recentlyWatched") == null) {
            recentlyWatched = [];
            localStorage.setItem("recentlyWatched", JSON.stringify(recentlyWatched));
        } else {
            recentlyWatched = JSON.parse(localStorage.getItem("recentlyWatched"));
        }
    }

    /**
     * 
     * @param {string} type Sorts titles based on input, type uses the value null if nothing is sent with it
     */
    function sortItems(type = null) {
        var mediaitems = document.querySelectorAll(".gallery-item");
        if (type == "movies") {
            mediaitems.forEach(mediaitem => {
                var mediatitle = mediaitem.querySelector(".mediatitle");
                if (mediatitle.getAttribute("data-mediatype") != "movie") {
                    mediaitem.style.display = "none";
                };
            });
        } else if (type == "shows") {
            mediaitems.forEach(mediaitem => {
                var mediatitle = mediaitem.querySelector(".mediatitle");
                if (mediatitle.getAttribute("data-mediatype") != "shows") {
                    mediaitem.style.display = "none";
                };
            });
        } else if (type == "favorites") {
            var titleItems = document.querySelectorAll(".gallery-item");
            checkFavorites();
            titleItems.forEach(titleitem => {
                var title = titleitem.querySelector(".mediatitle").textContent;
                var buttonI = titleitem.querySelector(".fa-heart");
                var match = false;
                favoritesArray.forEach(favorite => {
                    if (title == favorite) {
                        buttonI.classList.replace("far", "fas");
                        match = true;
                    }
                });
                if (match != true) {
                    titleitem.remove();
                }
            });

            titleItems = document.querySelectorAll(".gallery-item");
            if (titleItems.length == 0) {
                var pageinfo = document.querySelector(".pageinfo");
                pageinfo.classList.remove("hidden");
                pageinfo.classList.add("shown--flex")
                pageinfo.textContent = ("No favorites added...")
            }
        } else if (type == "recently watched") {
            sortedItems = [];
            var titleItems = document.querySelectorAll(".gallery-item");
            checkRecentlyWatched();
            titleItems.forEach(titleitem => {
                var title = titleitem.querySelector(".mediatitle").textContent;
                var match = false;
                recentlyWatched.forEach(recent => {
                    if (title == recent) {
                        match = true;
                    }
                });
                if (match != true) {
                    titleitem.remove();
                }
            });
            recentlyWatched.forEach(recent => {
                titleItems.forEach(titleitem => {
                    var title = titleitem.querySelector(".mediatitle").textContent;
                    if (title == recent) {
                        sortedItems.push(titleitem);
                    }
                });
            });
            sortedItems.forEach(sorteditem => {
                gallery.appendChild(sorteditem);
            });
            titleItems = document.querySelectorAll(".gallery-item");
            if (titleItems.length == 0) {
                var pageinfo = document.querySelector(".pageinfo");
                pageinfo.classList.remove("hidden");
                pageinfo.classList.add("shown--flex")
                pageinfo.textContent = ("It seems you haven't watched anything yet. Watch something and return here")
            }
        }
    }
});