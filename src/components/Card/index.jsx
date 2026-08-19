import styles from './card.module.css'
import testImg from '../../assets/img/testImg.png'
import starImg from '../../assets/img/starImg.png'

export function Card() {
    return (
        <div className={styles.cardContainer}>
            <img src={testImg} alt="" />
            <h3>Divertidamente 2</h3>
            <div className={styles.ratingContainer}>
                <img className={styles.starImg} src={starImg} alt="" />
                <p>8.1</p>
            </div>
        </div>
    )
}