document.addEventListener("DOMContentLoaded", function() { start_player(); }, false);
var player;

function video(name) {
    player.innerHTML = '';
    var source = document.createElement('source');
    player.appendChild(source);
    source.setAttribute('src', name);
    player.load();
    playVideo();
}

function start_player() {
    player = document.getElementById('video_player');
    player.controls = false;
}

function playVideo() {
    player.play();
}

function pauseVideo() {
    player.pause();
}
function removeVideo() {
    var myobj = document.getElementById("video_player");
    myobj.remove();
}