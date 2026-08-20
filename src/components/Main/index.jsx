import { useContext } from 'react'
import { CardList } from '../CardList'
import { Hero } from '../Hero'
import { SearchInput } from '../SearchInput'
import styles from './main.module.css'
import ApiContext from '../ApiProvider/ApiContext'

export function Main() {

    const {popularMoviesList} = useContext(ApiContext)
    const movies = popularMoviesList ? popularMoviesList : []

    return (
        <main className={styles.main}>
            <SearchInput/>
            <Hero/>
            <CardList title="Populares" movies={movies}/>
        </main>
    )
}