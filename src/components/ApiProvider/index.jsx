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
    const [favoritesIds, setFavoritesIds] = useState(new Set())

    function favKey(id, media_type) {
        return `${media_type}-${id}`
    }

    useEffect(() => {
        async function loadFavoritesIds() {
            try {
                const response = await fetch('http://localhost:3000/api/favorites/ids')
                const rows = await response.json()
                setFavoritesIds(new Set(rows.map(row => favKey(row.movie_id, row.media_type))))
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error)
            }
        }
        loadFavoritesIds()
    }, [])

    async function toggleFavorite(movie) {
        const media_type = movie.media_type || 'movie'
        const key = favKey(movie.id, media_type)
        const isFavorited = favoritesIds.has(key)
        
        setFavoritesIds(prev => {
            const next = new Set(prev)
            isFavorited ? next.delete(key) : next.add(key)
            return next
        })

        try {
            if (isFavorited) {
                await fetch(`http://localhost:3000/api/favorites/${movie.id}/${media_type}`, {
                    method: 'DELETE'
                })
            } else {
                await fetch(`http://localhost:3000/api/favorites`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        movie_id: movie.id,
                        media_type: media_type,
                        title: movie.title || movie.name,
                        poster_path: movie.poster_path || movie.profile_path || movie.backdrop_path,
                        vote_average: movie.vote_average
                    })
                })
            }
        } catch (error) {
            console.error('Erro ao favoritar:', error)
            setFavoritesIds(prev => {
                const next = new Set(prev)
                isFavorited ? next.add(key) : next.delete(key)
                return next
            })
        }
    }

    return (
        <ApiContext value={{
            popularMoviesList,
            topRatedMoviesList,
            nowPlayingMoviesList,
            upcomingMoviesList,
            heroMoviesList,
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
            favoritesIds,
            toggleFavorite
        }}>
            {children}
        </ApiContext>
    )
}

