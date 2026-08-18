import { Hero } from '../Hero'
import { SearchInput } from '../SearchInput'
import styles from './main.module.css'

export function Main() {
    return (
        <main className={styles.main}>
            <SearchInput/>
            <Hero/>
        </main>
    )
}