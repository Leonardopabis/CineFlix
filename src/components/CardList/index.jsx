import ApiContext from '../ApiProvider/ApiContext'
import { Card } from '../Card'
import styles from './card-list.module.css'
import { useContext, useState } from 'react'

export function CardList() {

    const {popularMoviesList} = useContext(ApiContext)
    const movies = popularMoviesList?.results || []

    return (
        <div className={styles.cardListContainer}>
            <h2>Populares</h2>
            <div className={styles.list}>
                <Card/>
                <Card/>
                {movies.map((movie) => {
                    console.log(movie)
                    return (
                        <Card key={movie.id} movie={movie}/>
                    )
                })}
            </div>
        </div>
    )
}