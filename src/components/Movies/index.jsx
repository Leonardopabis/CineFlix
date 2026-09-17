import { useEffect, useState } from 'react'
import styles from './movies.module.css'
import { Card } from '../Card'

const categories = [
    { key: 'popular', label: 'Populares' },
    { key: 'top_rated', label: 'Melhores avaliados' },
    { key: 'now_playing', label: 'Em cartaz' },
    { key: 'upcoming', label: 'Em breve' }
]

export function Movies() {
    const [category, setCategory] = useState('popular')
    const [page, setPage] = useState(1)

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setMovies([])
        setPage(1)
    }, [category])

    useEffect(() => {
        async function fetchMovies() {
            try {
                setLoading(true)

                const response = await fetch(
                    `http://localhost:3000/api/movies/${category}?page=${page}`
                )

                if (!response.ok) {
                    throw new Error('erro ao buscar filmes')
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
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [category, page])

    function handleLoadMore() {
        setPage((prevPage) => prevPage + 1)
    }

    if (loading && page === 1) {
        return <p>Carregando...</p>
    }

    return (
        <main className={styles.movies}>
            <h2>Filmes</h2>

            <div className={styles.tabs}>
                {categories.map((item) => (
                    <button
                        key={item.key}
                        className={`${styles.tab} ${category === item.key ? styles.tabActive : ''}`}
                        onClick={() => setCategory(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className={styles.results}>
                {movies.map((movie) => {
                    return (
                        <div className={styles.cardContainer} key={`movie-${movie.id}`}>
                            <Card key={`movie-${movie.id}`} movie={{ ...movie, media_type: 'movie' }} />
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