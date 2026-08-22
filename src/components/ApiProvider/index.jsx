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
        setCurrentInfoMovie(null)
        infoModalRef.current.close()
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
            closeInfoModal
        }}>
            {children}
        </ApiContext>
    )
}

