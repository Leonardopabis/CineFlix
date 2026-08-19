import { Card } from '../Card'
import styles from './card-list.module.css'
import { getPopularMovies  } from '../../../backend/api.js'
import { useState } from 'react'

export function CardList() {

    const [popularMoviesList, setPopularMoviesList] = useState([
        getPopularMovies()
    ])

    return (
        <div className={styles.cardListContainer}>
            <h2>Populares</h2>
            <Card/>
        </div>
    )
}