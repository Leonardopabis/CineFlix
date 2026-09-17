import { useEffect, useRef, useState } from "react";
import ApiContext from "./ApiContext";

async function fetchMovies(setMoviesList, pageNumber, listType) {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/${listType}?page=${pageNumber}`)

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const movies = await response.json()

        console.log('filmes recebidos: ', movies)
        setMoviesList(prevList => {
            const listaAtual = prevList || []
            return [...listaAtual, ...movies.results]
        })

    } catch (error) {
        console.log('Erro ao buscar filmes: ', error.message)
    }
}

async function fetchHeroMovies(setMoviesList) {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/heroFilms`)

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const movies = await response.json()

        console.log('filmes recebidos: ', movies)
        setMoviesList(movies.results)
    } catch (error) {
        console.log('Erro ao buscar filmes: ', error.message)
    }
}

export function ApiProvider({ children }) {

    const [popularMoviesList, setPopularMoviesList] = useState(null)
    const [popularSeriesList, setPopularSeriesList] = useState(null)
    const [topRatedSeriesList, setTopRatedSeriesList] = useState(null)
    const [onTheAirSeriesList, setOnTheAirSeriesList] = useState(null)
    const executouRef = useRef(false)

    const [topRatedMoviesList, setTopRatedMoviesList] = useState(null)
    const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(null)
    const [upcomingMoviesList, setUpcomingMoviesList] = useState(null)
    const [heroMoviesList, setHeroMoviesList] = useState(null)

    const [currentHeroIndex, setCurrentHeroIndex] = useState(0)

    useEffect(() => {
        if (executouRef.current) return
        executouRef.current = true
        const loadInitialData = async () => {
            setPopularMoviesList(null)
            //populares
            await fetchMovies(setPopularMoviesList, 1, 'popular')
            await fetchMovies(setPopularMoviesList, 2, 'popular')
            //top_rated
            await fetchMovies(setTopRatedMoviesList, 1, 'top_rated')
            await fetchMovies(setTopRatedMoviesList, 2, 'top_rated')
            //now_playinh
            await fetchMovies(setNowPlayingMoviesList, 1, 'now_playing')
            await fetchMovies(setNowPlayingMoviesList, 2, 'now_playing')
            //upcoming
            await fetchMovies(setUpcomingMoviesList, 1, 'upcoming')
            await fetchMovies(setUpcomingMoviesList, 2, 'upcoming')
            //hero movies
            await fetchHeroMovies(setHeroMoviesList)

            //series populares
            await fetchSeries(setPopularSeriesList, 1, 'popular')
            await fetchSeries(setPopularSeriesList, 2, 'popular')
            //series top_rated
            await fetchSeries(setTopRatedSeriesList, 1, 'top_rated')
            await fetchSeries(setTopRatedSeriesList, 2, 'top_rated')
            //series no ar
            await fetchSeries(setOnTheAirSeriesList, 1, 'on_the_air')
            await fetchSeries(setOnTheAirSeriesList, 2, 'on_the_air')

        }
        loadInitialData()
    }, [])

    const infoModalRef = useRef(null)
    const [currentInfoMovie, setCurrentInfoMovie] = useState('')
    function openInfoModal(movie) {
        setCurrentInfoMovie(movie)
        infoModalRef.current.showModal()
    }
    function closeInfoModal(movie) {
        setCurrentInfoMovie('')
        infoModalRef.current.close()
    }

    //search
    const [query, setQuery] = useState('')
    const [searchPage, setSearchPage] = useState('1')

    //database
    const [favoriteMovies, setFavoriteMovies] = useState(null)
    const [favoriteIds, setFavoriteIds] = useState(new Set())


    function favKey(id, media_type) {
        return `${media_type}-${id}`
    }

    useEffect(() => {
        fetchFavoriteIds(setFavoriteIds)
    }, [])

    async function toggleFavorite(movie) {
        const mediaType = movie.media_type || 'movie'
        const key = favKey(movie.id, mediaType)
        const isFavorited = favoriteIds.has(key)

        setFavoriteIds(prev => {
            const next = new Set(prev)
            isFavorited ? next.delete(key) : next.add(key)
            return next
        })

        try {
            if (isFavorited) {
                await fetch(`http://localhost:3000/api/favorites/${movie.id}/${mediaType}`, { method: 'DELETE' })
            } else {
                await fetch('http://localhost:3000/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        movie_id: movie.id,
                        media_type: mediaType,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average
                    })
                })
            }
        } catch (error) {
            console.log('Erro ao favoritar:', error)
            setFavoriteIds(prev => {
                const next = new Set(prev)
                isFavorited ? next.add(key) : next.delete(key)
                return next
            })
        }
    }

    async function fetchSeries(setSeriesList, pageNumber, listType) {
        try {
            const response = await fetch(`http://localhost:3000/api/series/${listType}?page=${pageNumber}`)

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const series = await response.json()

            setSeriesList(prevList => {
                const listaAtual = prevList || []
                return [...listaAtual, ...series.results]
            })
        } catch (error) {
            console.log('Erro ao buscar séries: ', error.message)
        }
    }

    async function fetchFavorites(setFavoriteMovies) {
        try {
            const response = await fetch('http://localhost:3000/api/favorites')

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const favorites = await response.json()
            setFavoriteMovies(favorites)
        } catch (error) {
            console.log('Erro ao buscar favoritos: ', error.message)
        }
    }

    async function fetchFavoriteIds(setFavoriteIds) {
        try {
            const response = await fetch('http://localhost:3000/api/favorites/ids')

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const rows = await response.json()
            setFavoriteIds(new Set(rows.map(row => `${row.media_type}-${row.movie_id}`)))
        } catch (error) {
            console.log('Erro ao buscar favoritos: ', error.message)
        }
    }

    return (
        <ApiContext value={{
            popularMoviesList,
            topRatedMoviesList,
            nowPlayingMoviesList,
            upcomingMoviesList,
            heroMoviesList,
            popularSeriesList,
            topRatedSeriesList,
            onTheAirSeriesList,
            currentHeroIndex,
            setCurrentHeroIndex,
            infoModalRef,
            currentInfoMovie,
            openInfoModal,
            closeInfoModal,
            query,
            setQuery,
            searchPage,
            setSearchPage,
            favoriteMovies,
            favoriteIds,
            toggleFavorite,
            fetchSeries,
            fetchFavoriteIds,
            fetchFavorites: () => fetchFavorites(setFavoriteMovies)
        }}>
            {children}
        </ApiContext>
    )
}

