import { useSearchParams } from 'react-router-dom'
import styles from './search-page.module.css'
import { useEffect, useState } from 'react'
import { Card } from '../Card'

export function SearchPage() {
        const [searchParams] = useSearchParams()
        const query = searchParams.get('query')
        const page = searchParams.get('page')

        const [movies, setMovies] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            async function fetchSearch() {
                try {
                    setLoading(true)

                    const response = await fetch(
                        `http://localhost:3000/api/movies/search?query=${query}&page=${page || 1}`
                    )

                    if (!response.ok) {
                        throw new Error('erro ao buscar')
                    }

                    const data = await response.json()

                    setMovies(data.results)
                } catch (error) {
                    console.log(error)
                }finally {
                    setLoading(false)
                }
            }

            if (query) {
                fetchSearch()
            }
        }, [query])

        if (loading) {
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
                        <Card key={`${movie.media_type}-${movie.id}`} movie={movie}/>
                    )
                })}

            </div>
        </main>
    )
}