import styles from './search-input.module.css'
import searchImg from '../../assets/img/aside_icons/searchImg.png'

export function SearchInput() {
    return (
        <form action="" className={styles.inputForm}>
            <img src={searchImg} alt="" />
            <input type="text" placeholder='Buscar filmes, séries, atores...'/>
        </form>
    )
}