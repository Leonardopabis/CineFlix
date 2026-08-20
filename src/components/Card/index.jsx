import styles from './card.module.css'
import starImg from '../../assets/img/starImg.png'

export function Card({movie}) {
    if(!movie) {
        return null
    }

    return (
        <div className={styles.cardContainer}>
                <img className={styles.movieImg} src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <div className={styles.ratingContainer}>
                <img className={styles.starImg} src={starImg} alt="" />
                <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}</p>
            </div>
        </div>
    )
}