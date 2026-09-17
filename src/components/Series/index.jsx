import { useEffect, useState } from 'react'
import styles from './series.module.css'
import { Card } from '../Card'

const categories = [
    { key: 'popular', label: 'Populares' },
    { key: 'top_rated', label: 'Melhores avaliadas' },
    { key: 'on_the_air', label: 'No ar' }
]

export function Series() {
    const [category, setCategory] = useState('popular')
    const [page, setPage] = useState(1)

    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setSeries([])
        setPage(1)
    }, [category])

    useEffect(() => {
        async function fetchSeries() {
            try {
                setLoading(true)

                const response = await fetch(
                    `http://localhost:3000/api/series/${category}?page=${page}`
                )

                if (!response.ok) {
                    throw new Error('erro ao buscar séries')
                }

                const data = await response.json()

                setSeries((prevSeries) => {
                    if (page === 1) {
                        return data.results
                    }
                    return [...prevSeries, ...data.results]
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchSeries()
    }, [category, page])

    function handleLoadMore() {
        setPage((prevPage) => prevPage + 1)
    }

    if (loading && page === 1) {
        return <p>Carregando...</p>
    }

    return (
        <main className={styles.series}>
            <h2>Séries</h2>

            <div className={styles.tabs}>
                {categories.map((item) => (
                    <button
                        key={item.key}
                        className={`${styles.tab} ${category === item.key ? styles.tabActive : ''}`}
                        onClick={() => setCategory(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className={styles.results}>
                {series.map((item) => {
                    return (
                        <div className={styles.cardContainer} key={`tv-${item.id}`}>
                            <Card key={`tv-${item.id}`} movie={{ ...item, media_type: 'tv' }} />
                        </div>
                    )
                })}
            </div>

            <button className={styles.button} onClick={handleLoadMore}>
                Carregar Mais
            </button>
        </main>
    )
}