import styles from './hero-card.module.css'

export function HeroCard({movie}) {
    const isTooLong = movie.overview.length > 250
    const cutOverview = isTooLong ? movie.overview.slice(0, 250) + '...' : movie.overview

    return (
        <>
            <img className={styles.heroImg} src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`} alt={movie.title} />
            <div className={styles.textContainer}>
                <span>Em destaque</span>
                <h2>{movie.title}</h2>
                <p>{cutOverview}</p>
                <button>Mais informações</button>
            </div>
        </>
    )
}