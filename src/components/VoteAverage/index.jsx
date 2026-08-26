import styles from './vote-average.module.css'
import starImg from '../../assets/img/starImg.png'

export function VoteAverage({movie}) {
    return (
        <div className={styles.ratingContainer}>
            <img className={styles.starImg} src={starImg} alt="" />
            <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}</p>
        </div>
        
    )
}