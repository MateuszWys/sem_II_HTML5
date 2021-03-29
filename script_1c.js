(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies-wrapper');
    const newMovieTitle = document.querySelector('#movie-title');
    const newMovieUrl = document.querySelector('#movie-url');
    let movies = Array.from(document.querySelectorAll('.movie'));

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })

    const createNewMovieElement = () => {
        const movieItem = document.createElement('li');
        movieItem.className = 'movie';
        const title = document.createElement('span');
        title.setAttribute('data-video', newMovieUrl.value);
        title.textContent = newMovieTitle.value;
        movieItem.appendChild(title);
        movieItem.appendChild(up);
        movieItem.appendChild(down);
        movieItem.appendChild(remove);
        movies.push(movieItem);
        initializeLitenersForMovieItem(movieItem);
        movieItem.setAttribute('data-index', (movies.length - 1).toString());
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
})();