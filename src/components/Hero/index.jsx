import { HeroCard } from '../HeroCard'
import styles from './hero.module.css'

export function Hero() {
    return (
        <section className={styles.heroContainer}>
            <HeroCard />
        </section>
    )
}