import { AsideCard } from '../AsideCard'
import styles from './aside-card-list.module.css'
import asideContext from '../AsideProvider/AsideContext' 
import { useContext } from 'react'

export function AsideCardList() {
    const {asideCards} = useContext(asideContext)

    return (
        <ul className={styles.asideCardList}>
            {asideCards.map(card => {
                return(
                    <AsideCard key={card.id} className={styles.asideCard} name={card.name} img={card.img} cardFocus={card.cardFocus}/>
                )
            })}
        </ul>
    )
}