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

export function ApiProvider({ children }) {
   
    const [popularMoviesList, setPopularMoviesList] = useState(null)
    const executouRef = useRef(false)

    const [topRatedMoviesList, setTopRatedMoviesList] = useState(null)
    const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(null)
    const [upcomingMoviesList, setUpcomingMoviesList] = useState(null)
    
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

        }
        loadInitialData()
    }, [])

    return (
        <ApiContext value={{
            popularMoviesList,
            topRatedMoviesList,
            nowPlayingMoviesList,
            upcomingMoviesList
        }}>
            {children}
        </ApiContext>
    )
}

