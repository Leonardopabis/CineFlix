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

    const title = movie.title || movie.name

    const image = movie.poster_path || movie.profile_path || movie.backdrop_path

    return (
        <div className={styles.cardContainer}>
                <img className={styles.movieImg} src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} />
            <h3>{title}</h3>
            <div className={styles.ratingContainer}>
                
                    <VoteAverage movie={movie}/>
                <div className={styles.footer}>
                    <button className={styles.infoImgBtn}><img className={styles.infoImg} src={infoImg} alt="" onClick={() => {openInfoModal(movie)}} /></button>
                </div>
            </div>
        </div>
    )
}