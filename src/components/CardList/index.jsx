import ApiContext from '../ApiProvider/ApiContext'
import { Card } from '../Card'
import styles from './card-list.module.css'
import { useContext, useRef, useState } from 'react'

export function CardList({title}) {

    const {popularMoviesList} = useContext(ApiContext)
    const movies = popularMoviesList?.results || []
    const cardListRef = useRef(null)

    const handleNext = () => {
        const container = cardListRef.current
        if (!container) return
        const card = container.firstElementChild
        if (!card) return
        console.log(card)
        const cardWidth = card.offsetWidth
        const gap = 20
        container.scrollBy({
            left: (cardWidth + gap) * 5,
            behavior: 'smooth',
        })
    }

    return (
        <div className="cardsCarousel">
            <div className={styles.cardListContainer}>
                <h2>{title}</h2>
                <div className={styles.list} ref={cardListRef}>
                    {movies.map((movie) => {
                        console.log(movie)
                        return (
                            <Card key={movie.id} movie={movie}/>
                        )
                    })}
                </div>

                <button className={[styles.carouselButton, styles.carouselButtonRight].join(' ')} onClick={handleNext}>

                </button>
            </div>
        </div>
    )
}