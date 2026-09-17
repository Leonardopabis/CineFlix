import { useContext, useEffect } from 'react'
import { Card } from '../Card'
import styles from './favorites.module.css'
import ApiContext from '../ApiProvider/ApiContext'

export function Favorites() {

    const { favoriteMovies, fetchFavorites } = useContext(ApiContext)

    useEffect(() => {
        fetchFavorites()
    }, [])

    if (favoriteMovies === null) {
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
                        media_type: item.media_type
                    }
                    return (
                        <div className={styles.cardContainer} key={`${formattedMovie.media_type}-${formattedMovie.id}`}>
                            <Card movie={formattedMovie} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}