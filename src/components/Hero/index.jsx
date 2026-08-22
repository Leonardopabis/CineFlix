import { useContext, useState } from 'react'
import { HeroCard } from '../HeroCard'
import styles from './hero.module.css'
import ApiContext from '../ApiProvider/ApiContext'

export function Hero({movies}) {
    const {currentHeroIndex, setCurrentHeroIndex} = useContext(ApiContext)

    if (!movies || movies.length === 0) {
        return null
    }

    const handleNext = () => {
        setCurrentHeroIndex((currentHeroIndex + 1) % movies.length)
    }
    const handlePrevious = () => {
        setCurrentHeroIndex((currentHeroIndex - 1 + movies.length) % movies.length)
    }

    const currentMovie = movies[currentHeroIndex]

    return (
        <div className={styles.cardsCarousel}>
            <button className={[styles.arrow, styles.arrowLeft].join(' ')} onClick={handlePrevious}></button>
            <section className={styles.heroContainer}>
                <HeroCard key={currentMovie.id} movie={currentMovie}/>
            </section>
            <button className={[styles.arrow, styles.arrowRight].join(' ')} onClick={handleNext}></button>

            <div className={styles.dots}>
                {movies.map((movie, index) => {
                    return (
                        <button key={movie.id} className={index === currentHeroIndex ? styles.activeDot : styles.dot} onClick={() => setCurrentHeroIndex(index)}>

                        </button>
                    )
                })}
            </div>
        </div>
    )
}