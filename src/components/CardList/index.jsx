import ApiContext from '../ApiProvider/ApiContext'
import { Card } from '../Card'
import styles from './card-list.module.css'
import { useContext, useRef, useState } from 'react'

export function CardList({title, movies}) {

    
    const cardListRef = useRef(null)

    const handleNext = (rightDirection) => {
        const container = cardListRef.current
        if (!container) return
        const card = container.firstElementChild
        if (!card) return
        // console.log(card)
        const cardWidth = card.offsetWidth
        const gap = 20
        if (rightDirection) {
                container.scrollBy({
                    left: (cardWidth + gap) * 5,
                    behavior: 'smooth',
                })
        } else {
            container.scrollBy({
                    left: -(cardWidth + gap) * 5,
                    behavior: 'smooth',
                })
        }
    }

    return (
        <div className={styles.cardsCarousel}>
            <div className={styles.cardListContainer}>
                <button className={[styles.carouselButton, styles.carouselButtonLeft].join(' ')} onClick={() => handleNext(false)}>
                </button>
                <h2>{title}</h2>
                <div className={styles.list} ref={cardListRef}>
                    {movies.map((movie) => {
                        // console.log(movie)
                        return (
                            <Card key={movie.id} movie={movie}/>
                        )
                    })}
                </div>

                <button className={[styles.carouselButton, styles.carouselButtonRight].join(' ')} onClick={() => handleNext(true)}>
                </button>
            </div>
        </div>
    )
}