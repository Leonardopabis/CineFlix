import styles from './card.module.css'
import starImg from '../../assets/img/starImg.png'
import infoImg from '../../assets/img/infoImg.png'
import { useContext } from 'react'
import ApiContext from '../ApiProvider/ApiContext'

export function Card({movie}) {
    if(!movie) {
        return null
    }
    const {openInfoModal} = useContext(ApiContext)

    return (
        <div className={styles.cardContainer}>
                <img className={styles.movieImg} src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <div className={styles.ratingContainer}>
                <div className={styles.rating}>
                    <img className={styles.starImg} src={starImg} alt="" />
                    <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}</p>
                </div>
                <div className={styles.footer}>
                    <button className={styles.infoImgBtn}><img className={styles.infoImg} src={infoImg} alt="" onClick={() => {openInfoModal(movie)}} /></button>
                </div>
            </div>
        </div>
    )
}