const API_KEY = "35884510-659c-4cda-b7b9-ad684a4e9d64";
const form = document.querySelector('form');
const moviesContainer = document.querySelector('.movies');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchTerm = form.querySelector('input').value;
    if (searchTerm.trim() === '') {
        alert('Введите название фильма для поиска.');
        return;
    }
    const searchUrl = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchTerm}&page=1`;
    try {
        const response = await fetch(searchUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const searchData = await response.json();
        if (searchData.films.length === 0) {
            moviesContainer.innerHTML = '<div class="movie__title">Фильмы не найдены</div>';
        } else {
            showMovies(searchData);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function getRating(vote) {
    if (vote !== null) {
        return vote;
    } else {
        return "*";
    }
}

function showMovies(data) {
    moviesContainer.innerHTML = '';
    data.films.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__cover">
                <img src="${movie.posterUrl}" alt="${movie.nameRu}">
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(elem => ` ${elem.genre}`).join(',')}</div>
                <div class="movie__average movie__average--${getClassByRate(movie.ratingImdb)}">
                    ${getRating(movie.ratingImdb)}
                </div>
            </div>
        `;
        moviesContainer.appendChild(movieEl);
    });
}
