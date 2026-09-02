import { useContext } from 'react'
import styles from './info-modal.module.css'
import ApiContext from '../ApiProvider/ApiContext'
import { VoteAverage } from '../VoteAverage';
import closeImg from '../../assets/img/closeImg.png'
import { Heart } from '../Heart';

export function InfoModal() {
    const  {infoModalRef, currentInfoMovie, closeInfoModal, favoritesIds} = useContext(ApiContext)
    const bgUrl = `https://image.tmdb.org/t/p/w500${currentInfoMovie?.poster_path || currentInfoMovie?.backdrop_path}`;
    const isFavorited = favoritesIds.has(`${currentInfoMovie.media_type || 'movie'}-${currentInfoMovie.id}`)

    return (
        <dialog className={styles.infoModal} ref={infoModalRef} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgUrl})`}}>
            {/* <div className={styles.imgContainer}>
                <img src={`https://image.tmdb.org/t/p/w500${currentInfoMovie.poster_path || currentInfoMovie.backdrop_path}`} alt="" />
            </div> */}
            <div className={styles.header}>
                <h2>{currentInfoMovie.title}</h2>
                <button onClick={closeInfoModal}><img className={styles.headerImg} src={closeImg} alt="" /></button>
            </div>
            <p className={styles.movieDescription}>{currentInfoMovie.overview}</p>
            <div className={styles.footer}>
                <p>Popularidade: {currentInfoMovie.popularity?.toFixed(0)}</p>
                <VoteAverage movie={currentInfoMovie}/>
                <Heart className={[styles.heartBtn, styles.btn].join(' ')} movie={currentInfoMovie} isFavorited={isFavorited}>{isFavorited ? "Desfavoritar" : "Favoritar"}</Heart>
            </div>
        </dialog>
    )
}