import styles from './card.module.css'
import starImg from '../../assets/img/starImg.png'
import infoImg from '../../assets/img/infoImg.png'
import { useContext } from 'react'
import ApiContext from '../ApiProvider/ApiContext'
import { VoteAverage } from '../VoteAverage'

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
                
                    <VoteAverage movie={movie}/>
                <div className={styles.footer}>
                    <button className={styles.infoImgBtn}><img className={styles.infoImg} src={infoImg} alt="" onClick={() => {openInfoModal(movie)}} /></button>
                </div>
            </div>
        </div>
    )
}