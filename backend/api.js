const TMBD_URL = 'https://api.themoviedb.org/3'

export async function getPopularMovies(pageNumber) {
    const response = await fetch(
        `${TMBD_URL}/movie/popular?language=pt-BR&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept: 'application/json'
            }
        }
    )

    if (!response.ok) {
        console.log('Status TMDB: ', response.status)
        console.log('Resposta TMDB: ', await response.text())
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()
}

export async function getTopRated(pageNumber) {
    const response = await fetch(
        `${TMBD_URL}/movie/top_rated?language=pt-BR&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept: 'application/json'
            }
        }
    )

    if (!response.ok) {
        console.log('Status TMDB: ', response.status)
        console.log('Resposta TMDB: ', await response.text())
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()
}

export async function getNowPlaying(pageNumber) {
    const response = await fetch(
        `${TMBD_URL}/movie/now_playing?language=pt-BR&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept: 'application/json'
            }
        }
    )

    if (!response.ok) {
        console.log('Status TMDB: ', response.status)
        console.log('Resposta TMDB: ', await response.text())
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()
}

export async function getUpcoming(pageNumber) {
    const response = await fetch(
        `${TMBD_URL}/movie/upcoming?language=pt-BR&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept: 'application/json'
            }
        }
    )

    if (!response.ok) {
        console.log('Status TMDB: ', response.status)
        console.log('Resposta TMDB: ', await response.text())
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()
}

export async function getHeroFilms() {
    const anoString = new Date().getFullYear().toString()
    const response = await fetch(
        `${TMBD_URL}/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_year=${anoString}&sort_by=vote_average.desc&vote_average.gte=8.2&vote_count.gte=1000`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept: 'application/json'
            }
        }

    )
    if (!response.ok) {
        console.log('Status TMDB: ', response.status)
        console.log('Resposta TMDB: ', await response.text())
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()

} 

export async function searchMovies(query, page = 1) {
    const response = await fetch(
         `${TMBD_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&page=${page}&include_adult=true`,
         {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept: 'application/json'
            }
         }
    )
    if (!response.ok) {
        console.log('Status tmdb: ', response.status)
        console.log('resposta tmdb', await response.text())
        throw new Error('Erro ao buscar filmes')
    }

    return response.json()
}