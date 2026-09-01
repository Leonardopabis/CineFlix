import { AsideCard } from '../AsideCard'
import styles from './aside-card-list.module.css'
import asideContext from '../AsideProvider/AsideContext' 
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

export function AsideCardList() {
    const location = useLocation()
    const {asideCards} = useContext(asideContext)

    return (
        <ul className={styles.asideCardList}>
            {asideCards.map(card => {
                return(
                    <AsideCard key={card.id} className={styles.asideCard} name={card.name} img={card.img} cardFocus={location.pathname == card.to} to={card.to}/>
                )
            })}
        </ul>
    )
}