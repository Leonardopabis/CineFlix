import { useEffect, useState } from "react";
import ApiContext from "./ApiContext";
import { getPopularMovies  } from '../../../backend/api.js'

async function fetchPopularFilms(setPopularMoviesList) {
    try {
        const response = await fetch('http://localhost:3000/api/movies/popular')

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const movies = await response.json()

        console.log('filmes recebidos: ', movies)
        setPopularMoviesList(movies)
    } catch (error) {
        console.log('Erro ao buscar filmes: ', error.message)
    }
}

export function ApiProvider({ children }) {
   
    const [popularMoviesList, setPopularMoviesList] = useState(null)

    useEffect(() => {
        fetchPopularFilms(setPopularMoviesList)
    }, [])

    return (
        <ApiContext value={{
            popularMoviesList,
        }}>
            {children}
        </ApiContext>
    )
}

