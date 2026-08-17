import { AsideCard } from '../AsideCard'
import styles from './aside-card-list.module.css'
import homeImg from '../../assets/img/aside_icons/homeImg.png'
import searchImg from '../../assets/img/aside_icons/searchImg.png'

export function AsideCardList() {
    return (
        <ul className={styles.asideCardList}>
            <AsideCard className={styles.asideCard} name="Home" img={homeImg} cardFocus='true' key={key.id}/>
            <AsideCard className={styles.asideCard} name="Buscar" img={searchImg}/>
        </ul>
    )
}