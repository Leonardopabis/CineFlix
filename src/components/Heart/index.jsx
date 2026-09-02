import styles from './heart.module.css'

import emptyHeart from '../../assets/img/emptyHeart.png'
import filledHeart from '../../assets/img/filledHeart.png'
import { useContext } from 'react'
import ApiContext from '../ApiProvider/ApiContext'

export function Heart({className, movie, isFavorited, children}) {
    const {toggleFavorite} = useContext(ApiContext)
    if(!movie) {
        return null
    }

    return (
        <button className={className} onClick={() => toggleFavorite(movie)}>
            <img className={styles.img} src={isFavorited ? filledHeart : emptyHeart} alt={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"} />
            {children}
        </button>
    )
}