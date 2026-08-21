import styles from './hero-card.module.css'

export function HeroCard() {
    return (
        <>
            <img className={styles.heroImg} src="../../src/assets/img/testImg.png" alt="" />
            <div className={styles.textContainer}>
                <span>Em destaque</span>
                <h2>Duna</h2>
                <p>Descrição</p>
                <button>Mais informações</button>
            </div>
        </>
    )
}