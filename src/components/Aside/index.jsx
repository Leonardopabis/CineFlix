import styles from './aside.module.css'
import logoPng from '../../assets/img/aside_icons/logo.png'
import { AsideCardList } from '../AsideCardList'

export function Aside() {
    return (
        <aside className={styles.aside}>
            <div className={styles.imageContainer}>
                <img src={logoPng} alt="" />
            </div>
            <AsideCardList>

            </AsideCardList>
        </aside>
    )
}