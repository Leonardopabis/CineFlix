import { Link, useNavigate } from 'react-router-dom'
import styles from './aside-card.module.css'

export function AsideCard({name, img, cardFocus, to}) {
    const navigate = useNavigate()

    const handleLink = () => {
        navigate(to)
    }

    return (
        <button className={`${styles.asideCardContainer} ${cardFocus ? styles.cardFocus : ''}`} onClick={handleLink}>
            <div className={styles.imageContainer}>
                <img src={img} alt="" />
            </div>
            <p>{name}</p>
        </button>
    )
}