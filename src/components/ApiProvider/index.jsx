import { useEffect, useRef, useState } from "react";
import ApiContext from "./ApiContext";

async function fetchPopularFilms(setPopularMoviesList, pageNumber) {
    try {
        const response = await fetch(`http://localhost:3000/api/movies/popular?page=${pageNumber}`)

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const movies = await response.json()

        console.log('filmes recebidos: ', movies)
        setPopularMoviesList(prevList => {
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

    useEffect(() => {
        if (executouRef.current) return
        executouRef.current = true
        const loadInitialData = async () => {
            setPopularMoviesList(null)
            await fetchPopularFilms(setPopularMoviesList, 1)
            await fetchPopularFilms(setPopularMoviesList, 2)
        }
        loadInitialData()
    }, [])

    return (
        <ApiContext value={{
            popularMoviesList,
        }}>
            {children}
        </ApiContext>
    )
}

