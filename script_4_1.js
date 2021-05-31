function moveUp() {
    var sel = document.getElementById("cols");
    var i1=0, i2=1;
    while (i2 < sel.options.length) {
        swapIf(sel,i1++,i2++);
    }
}
function moveDown() {
    var sel = document.getElementById("cols");
    var i1=sel.options.length-1, i2=i1-1;
    while (i1 > 0) {
        swapIf(sel,i1--,i2--);
    }
}
var swapVar = '';
function swapIf(sel,i1,i2) {
    if ( ! sel[i1].selected && sel[i2].selected) {
        swapVar = sel[i2].text;
        sel[i2].text = sel[i1].text;
        sel[i1].text = swapVar;
        swapVar = sel[i2].value;
        sel[i2].value = sel[i1].value;
        sel[i1].value = swapVar;
        sel[i1].selected = true;
        sel[i2].selected = false;
    }
}
function changeVolume(){
    var video = document.getElementById("autovideo");
    var chngVol = document.getElementById("volume");
    var volumeProgress = document.getElementById("progress");
    video.volume = chngVol.value/100;
    volumeProgress.value=chngVol.value
}
function changeTime(){
    var video = document.getElementById("autovideo");
    var input = document.getElementById("position");
    var progress_bar = document.getElementById("progress_position");
    var duration = video.duration;
    if (input.value > 0)
        video.currentTime = (input.value) / 100 * duration;
    progress_bar.value = input.value;
};
function FullScreen(){
    var video = document.getElementById("autovideo");
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();
    }
}

function SaveTime(link){
    var video = document.getElementById("autovideo");
    window.localStorage.setItem(video.src, video.currentTime);
    document.getElementById('autovideo').setAttribute('src', link)
    video.currentTime = window.localStorage.getItem(video.src);
    document.getElementById('autovideo').muted = 0;
}

window.onbeforeunload = function() {
    var video = document.getElementById("autovideo");
    window.localStorage.setItem(video.src, video.currentTime);
}

window.onload = function() {
    var video = document.getElementById("autovideo");
    video.currentTime = window.localStorage.getItem(video.src);
}

function PlayVideo(){
    var video = document.getElementById("autovideo");
    video.play()
}
function PauseVideo(){
    var video = document.getElementById("autovideo");
    video.pause()
}

function removeParentheses(string) {
    var result = string.toString().replaceAll('\"', '');
    return result;
}

function getParamNames(func) {
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var result = func.slice(func.indexOf('(') + 1, func.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}

function NextVideo(){
    var video = document.getElementById("autovideo");
    var arr = [];
    var lis = document.getElementsByTagName("option");
    console.log(lis);
    current_video_index = 0;
    for (var i = 0; i < lis.length; ++i) {
        if (lis[i].outerHTML.includes(video.src)) {
            current_video_index = i;
        }
        if (lis[i].selected) {
            arr.push(lis[i]);
        }
    }
    if (current_video_index < arr.length - 1) {
        next_video_link = removeParentheses(getParamNames(arr[current_video_index + 1].getAttribute('onclick')));
        video.src = next_video_link;
        current_video_index += 1;
    } else {
        next_video_link = removeParentheses(getParamNames(arr[0].getAttribute('onclick')));
        video.src = next_video_link;
        current_video_index = 0;
    }
    video.load();

}
function BeforeVideo(){
    var video = document.getElementById("autovideo");
    var arr = [];
    var lis = document.getElementsByTagName("option");
    current_video_index = 0;
    for (var i = 0; i < lis.length; ++i) {
        if (lis[i].outerHTML.includes(video.src)) {
            current_video_index = i;
        }
        if (lis[i].selected) {
            arr.push(lis[i]);
        }
    }
    if (current_video_index == 0) {
        next_video_link = removeParentheses(getParamNames(arr[arr.length - 1].getAttribute('onclick')));
        video.src = next_video_link;
        current_video_index = arr.length - 1;
    } else {
        next_video_link = removeParentheses(getParamNames(arr[current_video_index - 1].getAttribute('onclick')));
        video.src = next_video_link;
        current_video_index -= 1;
    }
    video.load();
}

var listOfElements;

function getAllElementsFromList() {
    listOfElements = document.getElementsByTagName("option");
}

function saveList() {
    getAllElementsFromList();
    var listofLinks = [];
    for (let i = 0; i < listOfElements.length; i++) {
        let curr = removeParentheses(getParamNames(listOfElements[i].getAttribute('onclick')));
        listofLinks.push(curr);
    }
    var textDoc = document.createElement('a');
    textDoc.href = 'data:attachment/text,' + encodeURI(listofLinks.join('\n'));
    textDoc.target = '_blank';
    textDoc.download = 'Videos_list.txt';
    textDoc.click()
}

function loadList(){
    
}