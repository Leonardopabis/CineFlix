import { useSearchParams } from 'react-router-dom'
import styles from './search-page.module.css'
import { useEffect, useState } from 'react'
import { Card } from '../Card'

export function SearchPage() {
        const [searchParams] = useSearchParams()
        const query = searchParams.get('query')
        const [page, setPage] = useState(1)
        

        const [movies, setMovies] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            setMovies([])
            setPage(1)
        }, [query])

        useEffect(() => {
            async function fetchSearch() {
                try {
                    setLoading(true)

                    const response = await fetch(
                        `http://localhost:3000/api/movies/search?query=${query}&page=${page}`
                    )

                    if (!response.ok) {
                        throw new Error('erro ao buscar')
                    }

                    const data = await response.json()

                    setMovies((prevMovies) => {
                        if (page === 1) {
                            return data.results
                        }
                        return [...prevMovies, ...data.results]
                    })
                } catch (error) {
                    console.log(error)
                }finally {
                    setLoading(false)
                }
            }

            if (query) {
                fetchSearch()
            }
        }, [query, page])

        function handleLoadMore() {
            setPage((prevPage) => prevPage + 1)
        }

        if (loading && page === 1) {
            return <p>Carregando...</p>
        }

    return (
        <main className={styles.searchPage}>
            <h2>
                Resultados para: "{query}"
            </h2>

            <div className={styles.results}>
                {movies.map((movie) => {
                    return(
                        <div className={styles.cardContainer} key={`${movie.media_type}-${movie.id}`}>
                            <Card key={`${movie.media_type}-${movie.id}`} movie={movie}/>
                        </div>
                    )
                })}

            </div>

            <button className={styles.button} onClick={handleLoadMore}>
                Carregar Mais
            </button>
        </main>
    )
}