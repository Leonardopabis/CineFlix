import { useContext } from 'react'
import { CardList } from '../CardList'
import { Hero } from '../Hero'
import { SearchInput } from '../SearchInput'
import styles from './main.module.css'
import ApiContext from '../ApiProvider/ApiContext'

export function Main() {

    const {popularMoviesList, topRatedMoviesList, nowPlayingMoviesList, upcomingMoviesList} = useContext(ApiContext)
    const popularMovies = popularMoviesList ? popularMoviesList : []
    const topRatedMovies = topRatedMoviesList ? topRatedMoviesList : []
    const nowPlayingMovies = nowPlayingMoviesList ? nowPlayingMoviesList : []
    const upcomingMovies = upcomingMoviesList ? upcomingMoviesList : []

    

    return (
        <main className={styles.main}>
            <SearchInput/>
            <Hero/>
            <CardList title="Populares" movies={popularMovies}/>
            <CardList title="Melhores Avaliações" movies={topRatedMovies}/>
            <CardList title="Em Cartaz" movies={nowPlayingMovies}/>
            <CardList title="Próximos Lançamentos" movies={upcomingMovies}/>
        </main>
    )
}