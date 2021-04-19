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
        input.value = video.currentTime / duration * 100
    progress_bar.value = input.value;
};