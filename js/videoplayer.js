document.addEventListener("DOMContentLoaded",function(){

//Få fat i elementer
var player = document.querySelector(".player");
var video = player.querySelector(".viewer");
var progress = player.querySelector(".progress");
var progressBar = player.querySelector(".progress__filled");
var toggle = player.querySelector(".toggle");
var volume = player.querySelector(".volume");
var time = player.querySelector(".time");
var infotext = player.querySelector(".infotext");
var srcError = player.querySelector(".src-error");
var urlParams = new URLSearchParams(window.location.search);
var volumeicon = player.querySelector(".volumeicon i");
var volumeiconbutton = player.querySelector(".volumeicon");

videoUrl = urlParams.get("v")
if(videoUrl != null){
    var newsrc = "assets/media/trailers/" + videoUrl + ".mp4";
    video.src = newsrc;
}else{
    srcError.style.display = "flex";
    video.style.display = "none";
}


/* XML data thing */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getInfo(this);
    }
};

/* http://www.omdbapi.com/?apikey=9a3cc64a&t=the_godfather&plot=full&r=xml */
xhttp.open("GET", "http://www.omdbapi.com/?apikey=9a3cc64a&t=" + videoUrl + "&plot=full&r=xml", true);
xhttp.send();

/**
 * 
 * @param {string} xml Gets info from the xml file and writes it in document.
 */
function getInfo(xml) {
    var x, xmlDoc, title, imdbrating, plot;
    xmlDoc = xml.responseXML;
    response = xmlDoc.getElementsByTagName('root');
    response = response[0].getAttribute('response');
    if (response == "True"){
        x = xmlDoc.getElementsByTagName('movie');
        title = x[0].getAttribute('title');
        imdbrating = x[0].getAttribute('imdbRating');
        plot = x[0].getAttribute('plot')

        var mediaTitle = document.querySelector(".mediatitle");
        var mediaPlot = document.querySelector(".mediaplot");
        var mediaImdb = document.querySelector(".mediaimdb");
        mediaTitle.textContent = title;
        mediaPlot.textContent = plot.replace(/&quot;/g, '"');
        mediaImdb.textContent = "IMDB rating: " + imdbrating;
    }
    else{
        alert("There was an error getting media information");
    }

}        
/* */

video.onerror = function(){
    srcError.style.display = "flex"
    video.style.display = "none"
}

//Funktioner
/**
 * Starts and stops video
 */
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
};
/**
 * Updates pause play button with the coresponding icon.
 */
function updateButton(){
    var icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

/**
 * Mutes or unmutes video, and changes speaker icon acordingly.
 */
function mutebutton(){
    if(video.muted == true){
        if (!volumeicon.classList.contains("fa-volume-mute")){
            if (volumeicon.classList.contains("fa-volume-up")){
                volumeicon.classList.remove("fa-volume-up");
                volumeicon.classList.add("fa-volume-mute");
            }else if(volumeicon.classList.contains("fa-volume-down")){
            volumeicon.classList.remove("fa-volume-down");
            volumeicon.classList.add("fa-volume-mute");
        };
    }
        volume.value = 0;
        infotext.classList.add("fade");
        infotext.textContent = "Volume: " + 0;
    }else{
        if(volumeicon.classList.contains("fa-volume-mute")){
            volumeicon.classList.remove("fa-volume-mute");
            volumeicon.classList.add("fa-volume-up");
    };
        volume.value = 1;
        video.volume = 1;
        infotext.classList.add("fade");
        infotext.textContent = "Volume: " + volume.value;
    }
}

/**
 * Handles change in volume and changes speaker acordingly
 */
function handleVolumeUpdate(){
    video.volume = volume.value;
    if(video.volume >= 0.5 && video.volume > 0 && !volumeicon.classList.contains("fa-volume-up")){
        video.muted = false;
        if (volumeicon.classList.contains("fa-volume-down")){
            volumeicon.classList.remove("fa-volume-down");
            volumeicon.classList.add("fa-volume-up");
        }else if(volumeicon.classList.contains("fa-volume-mute")){
        volumeicon.classList.remove("fa-volume-mute");
        volumeicon.classList.add("fa-volume-up");
    };
    }
    if(video.volume < 0.5 && video.volume > 0 && !volumeicon.classList.contains("fa-volume-down")){
        video.muted = false;
        if (volumeicon.classList.contains("fa-volume-up")){
            volumeicon.classList.remove("fa-volume-up");
            volumeicon.classList.add("fa-volume-down");
        }else if(volumeicon.classList.contains("fa-volume-mute")){
        volumeicon.classList.remove("fa-volume-mute");
        volumeicon.classList.add("fa-volume-down");
    };
    }

    if (video.volume == 0 && !volumeicon.classList.contains("fa-volume-mute")){
        video.muted = true;
        if (volumeicon.classList.contains("fa-volume-up")){
            volumeicon.classList.remove("fa-volume-up");
            volumeicon.classList.add("fa-volume-mute");
        }else if(volumeicon.classList.contains("fa-volume-down")){
        volumeicon.classList.remove("fa-volume-down");
        volumeicon.classList.add("fa-volume-mute");
    };
    };
    infotext.classList.add("fade");
    infotext.textContent = "Volume: " + volume.value;
};

/**
 * Handles progressbar and time spent/ time left.
 */
function handleProgress(){
    var percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent +"%"

    var currentmins = Math.floor(video.currentTime / 60);
	var currentsecs = Math.floor(video.currentTime - currentmins * 60);
	var durationmins = Math.floor(video.duration / 60);
	var durationsecs = Math.floor(video.duration - durationmins * 60);
	if(currentsecs < 10){ 
        currentsecs = "0"+currentsecs; 
    }
    if(durationsecs < 10){
        durationsecs = "0"+durationsecs; 
    }
	if(currentmins < 10){ 
        currentmins = "0"+currentmins; 
    }
	if(durationmins < 10){ 
        durationmins = "0"+durationmins; 
    }
    time.textContent = currentmins +":"+ currentsecs + " / " + durationmins+":"+durationsecs;
}
/**
 * 
 * @param {string} event - changes progressbar progress and sets video time
 */
function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
/**
 * Toggles fullscreen
 */
function toggleFullscreen(){
    if(window.fullScreen || window.innerWidth == screen.width && window.innerHeight == screen.height ||document.webkitIsFullScreen || document.mozFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }else{
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) { /* Firefox */
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            player.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            player.msRequestFullscreen();
        }
    };
};

var hovertime = document.querySelector(".hovertime");
/**
 * 
 * @param {string} event - Displays time when hovering on the progressbar.
 */
function timeDisplay(event){
    const hoverTime = (event.offsetX / progress.offsetWidth) * video.duration;
    var currentmins = Math.floor(hoverTime / 60);
	var currentsecs = Math.floor(hoverTime - currentmins * 60);
	if(currentsecs < 10){ 
        currentsecs = "0"+currentsecs; 
    }
	if(currentmins < 10){ 
        currentmins = "0"+currentmins; 
    }

    if(event.offsetX < (hovertime.offsetWidth / 2)){
        hovertime.style.left = 0 +"px";
    }
    else if(event.offsetX > (progress.offsetWidth - (hovertime.offsetWidth / 2))){
        hovertime.style.left = (progress.offsetWidth - hovertime.offsetWidth) + "px";
    }else{
        hovertime.style.left = (event.offsetX - (hovertime.offsetWidth /2)) +"px";
    }

    hovertime.textContent = currentmins + ":" + currentsecs;
}

//Eventlisteners
infotext.addEventListener("transitionend", function(){
    setTimeout(function(){
        infotext.classList.remove("fade");
    },1000)
});

video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handleProgress);
video.addEventListener("dblclick",toggleFullscreen);

var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));

progress.addEventListener("mousemove",function(event){
    if (!hovertime.classList.contains("showntime")){
        hovertime.classList.add("showntime");
    }
    timeDisplay(event);
});

progress.addEventListener("mouseleave",function(){
    if (hovertime.classList.contains("showntime")){
        hovertime.classList.remove("showntime");
    }
});


progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


volume.addEventListener("change", handleVolumeUpdate);

document.addEventListener("keydown", function(event){
    if(event.keyCode == 70){ // F key
        toggleFullscreen();
    }
    else if(event.keyCode == 39){   //Arrow right 
        video.currentTime += 5;
    }
    else if(event.keyCode == 37){  //Arrow left
        video.currentTime += -5;
    }
    else if(event.keyCode == 38){  //Arrow up
        volume.value = volume.value - -0.05
        handleVolumeUpdate();
    }
    else if(event.keyCode == 40){  //Arrow down
        volume.value = volume.value - 0.05;
        handleVolumeUpdate();
    }
    else if(event.keyCode == 32){   //Space
        togglePlay();
    }
});
var fullScreen = document.querySelector(".fullscreen")
fullScreen.addEventListener("click",function(){
    toggleFullscreen();
});

volumeiconbutton.addEventListener("click",function(event){
    console.log("Lol shit works");
    if (volumeicon.classList.contains("fa-volume-up") || volumeicon.classList.contains("fa-volume-down")){
        video.muted = true;
        mutebutton();
    }
    else{
        video.muted = false;
        mutebutton();
    }
});

player.addEventListener("click",function(event){
    if(event.target.classList.contains("toggle")){
        togglePlay();

    }else if(event.target.classList.contains("viewer")){
        togglePlay();

    } else if(event.target.getAttribute("data-skip")){
        video.currentTime += parseFloat(event.target.dataset.skip);
    } else if (event.target.getAttribute("data-speed")){
        video.playbackRate = event.target.dataset.speed;
    }
});
/**
 * show Loading animation when user clicks on a new place on the timeline
 */
var loader = document.querySelector(".loader");
video.addEventListener("seeking",function(){
    loader.style.display = "flex";
});
video.addEventListener("loadstart",function(){
    loader.style.display = "flex";
});
/**
 * hide loading animation after video is done loading
 */
video.addEventListener("canplay",function(){
    loader.style.display = "none";
});
});