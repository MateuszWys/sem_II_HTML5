(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies-wrapper');
    const newMovieTitle = document.querySelector('#movie-title');
    const newMovieUrl = document.querySelector('#movie-url');
    const addMovieButton = document.querySelector('.add-movie__button');
    let movies = Array.from(document.querySelectorAll('.movie'));

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })

    const createNewMovieElement = () => {
        const movieItem = document.createElement('option');
        movieItem.textContent = newMovieTitle.value;
        var url = newMovieUrl.value;
        url = '\"'.concat(url);
        url = url.concat('\"');
        movieItem.setAttribute('onclick', `runVideo(${url})`);
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';
    }

    const swapArrayElements = (arr, indexA, indexB) => [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
    const setPlayVideoListener = (movie) => {
        const movieLink = movie.querySelector('.movie__link');
        movieLink.addEventListener('click', () => {
            videoPlayer.src = movieLink.getAttribute('data-video');
        });
    }

    const initializeLitenersForMovieItem = (movieItem) => {
        setPlayVideoListener(movieItem);
        setMoveUpListener(movieItem);
        setMoveDowListener(movieItem);
        setRemoveListener(movieItem);
    }

    const renderList = () => {
        playlistWrapper.innerHTML = '';
        movies.forEach((movieItem, idx) => {
            movieItem.setAttribute('data-index', idx.toString());
            playlistWrapper.appendChild(movieItem);
        });
    }

    movies.forEach(movie => initializeLitenersForMovieItem(movie));
    renderList();
});

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