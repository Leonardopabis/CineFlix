import styles from './card.module.css'
import imageNotFound from '../../assets/img/imageNotFound.png'
import infoImg from '../../assets/img/infoImg.png'
import { useContext } from 'react'
import ApiContext from '../ApiProvider/ApiContext'
import { VoteAverage } from '../VoteAverage'
import { Heart } from '../Heart'

export function Card({movie}) {
    if(!movie) {
        return null
    }
    const {openInfoModal, favoritesIds, toggleFavorite} = useContext(ApiContext)
    const isFavorited = favoritesIds.has(`${movie.media_type || 'movie'}-${movie.id}`)

    const title = movie.title || movie.name

    const imagePath = movie.poster_path || movie.profile_path || movie.backdrop_path
    const image = imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : imageNotFound

    return (
        <div className={styles.cardContainer}>
                <img className={styles.movieImg} src={`${image}`} alt={title} />
            <h3>{title}</h3>
            <div className={styles.ratingContainer}>
                    <VoteAverage movie={movie}/>
                <div className={styles.footer}>
                    <Heart className={[styles.heartBtn, styles.btn].join('')} movie={movie} isFavorited={isFavorited}></Heart>

                    <button className={[styles.infoImgBtn, styles.btn].join('')}><img className={styles.img} src={infoImg} alt="" onClick={() => {openInfoModal(movie)}} /></button>
                </div>
            </div>
        </div>
    )
}