const key = 'dd04b275eba465c9ed1a89f44563c38c';
const urlList = 'https://api.themoviedb.org/4/list/1?page=1&api_key=dd04b275eba465c9ed1a89f44563c38c'
const movieSearch = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=`
const imgPath = 'https://image.tmdb.org/t/p/w1280'
const main = document.querySelector('main')
const form = document.querySelector('[data-inputSearch]')

getMovies()

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const input = document.querySelector('.input')
    getMovieBySearch(input.value)
    input.value = ''
})

function createdMovie(movies) {
    main.innerHTML = ''
    movies.forEach(movie => {
        let urlImg = '';
        const movieEl = document.createElement('div')
        let cor = '';
        const nota = movie.vote_average
        if (movie.poster_path === null) {
            urlImg = './assets/img/ntofound.png';
        } else {
            urlImg = imgPath + movie.poster_path;
        }

        if (movie.vote_average >= 7) {
            cor = 'green'
        } else if (movie.vote_average >= 5) {
            cor = 'yellow'
        } else {
            cor = 'red'
        }
        movieEl.innerHTML =
            `
        <div class="movie">
             <img src="${urlImg}" class="movie-img">
             <div class="movie-info">
                 <h2>${movie.original_title}</h2>
                 <h3 class="${cor}">${nota.toFixed(1)}</h3>
             </div>
             <h3 class="sinopse"><span class="sinopse-span">Sinopse:</span>${movie.overview}</h3>
        </div>
        `
        main.appendChild(movieEl)
    });
}

async function getMovies() {
    const response = await fetch(urlList)
    const data = await response.json()
    const movies = data.results
    createdMovie(movies)
}

async function getMovieBySearch(term) {
    if (term === '') {
        return
    } else {
        const response = await fetch(movieSearch + term)
        const data = await response.json()
        const movies = data.results
        if (movies.length == 0) {
            notFound()
        } else {
            createdMovie(movies)
        }
    }

}


function notFound() {
    main.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('div-notfound')
    div.innerHTML = `
    <h2 class="notfound">Sorry but nothing was found</h2>
    `
    main.appendChild(div)
}