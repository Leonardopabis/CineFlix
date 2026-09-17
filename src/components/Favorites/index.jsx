import { Card } from '../Card'
import styles from './favorites.module.css'
import { getFavoritesMovies } from '../../../backend/api'
import { useEffect, useState } from 'react'

export function Favorites() {

    const [favoriteMovies, setFavoriteMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const data = await getFavoritesMovies()

                setFavoriteMovies(data || [])
            } catch (error) {
                console.log("Erro ao buscar filmes favoritos: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [])

    if (loading) {
        return <div className={styles.favorites}>Carregando favoritos...</div>
    }

    return (
        <div className={styles.favorites}>
            <h2>Favoritos</h2>
            <div className={styles.favoritesContainer}>
                {favoriteMovies.map((item) => {
                    const voteAverageNumber = item.vote_average ? parseFloat(item.vote_average) : 0.0
                    const formattedMovie = {
                        id: item.movie_id, 
                        title: item.title,
                        poster_path: item.poster_path,
                        release_date: item.release_date,
                        vote_average: voteAverageNumber,
                    }
                    return (
                        <div className={styles.cardContainer} key={`${formattedMovie.media_type}-${formattedMovie.id}`}>
                            <Card key={formattedMovie.id} movie={formattedMovie} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}