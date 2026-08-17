import styles from './aside-card.module.css'

export function AsideCard({name, img, cardFocus}) {
    return (
        <button className={`${styles.asideCardContainer} ${cardFocus ? styles.cardFocus : ''}`}>
            <div className={styles.imageContainer}>
                <img src={img} alt="" />
            </div>
            <p>{name}</p>
        </button>
    )
}