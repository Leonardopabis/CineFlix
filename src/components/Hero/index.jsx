import styles from './hero.module.css'
//https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&primary_release_year=2026&sort_by=vote_average.desc&vote_average.gte=8.2&vote_count.gte=1000' \ url da api para pegar uns 6 filmes famosos desse ano
export function Hero() {
    return (
        <section className={styles.heroContainer}>
            <img className={styles.heroImg} src="../../src/assets/img/testImg.png" alt="" />
            <div className={styles.textContainer}>
                <span>Em destaque</span>
                <h2>Duna</h2>
                <p>Descrição</p>
                <button>Mais informações</button>
            </div>
        </section>
    )
}