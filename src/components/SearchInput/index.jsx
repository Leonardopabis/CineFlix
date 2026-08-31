import styles from './search-input.module.css'
import searchImg from '../../assets/img/aside_icons/searchImg.png'
import { useContext } from 'react'
import ApiContext from '../ApiProvider/ApiContext'
import { useNavigate } from 'react-router-dom'

export function SearchInput() {

    const {query, setQuery, searchPage, setSearchPage} = useContext(ApiContext)
    const navigate = useNavigate()

    const handleSearch = (event) => {
        setSearchPage('1')
        event.preventDefault()
        const search = query.trim()
        if (!search) {
            return
        }
        navigate(`/search?query=${encodeURIComponent(search)}&page=${searchPage}`)
    }

    return (
        <form onSubmit={handleSearch} className={styles.inputForm}>
            <img src={searchImg} alt="" />
            <input type="text" placeholder='Buscar filmes, séries, atores...'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            />
        </form>
    )
}