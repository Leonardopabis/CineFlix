import styles from './aside.module.css'
import logoPng from '../../assets/img/aside_icons/logo.png'

export function Aside() {
    return (
        <aside>
            <img src={logoPng} alt="" />
        </aside>
    )
}