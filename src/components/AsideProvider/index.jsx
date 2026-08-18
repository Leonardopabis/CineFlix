import { useState } from "react";
import AsideContext from "./AsideContext";

import homeImg from '../../assets/img/aside_icons/homeImg.png'
import filmesImg from '../../assets/img/aside_icons/filmsImg.png'
import searchImg from '../../assets/img/aside_icons/searchImg.png'
import tvImg from '../../assets/img/aside_icons/tvImg.png'
import favoritesImg from '../../assets/img/aside_icons/favoritesImg.png'
import profileImg from '../../assets/img/aside_icons/profileImg.png'

export function AsideProvider({ children }) {
    const [asideCards, setAsideCards] = useState([
        {
            id: crypto.randomUUID(),
            name: 'Home',
            img: `${homeImg}`,
            cardFocus: true,
        },
        {
            id: crypto.randomUUID(),
            name:'Filmes',
            img: `${filmesImg}`,
            cardFocus: false,
        },
        {
            id: crypto.randomUUID(),
            name: 'Séries',
            img: `${tvImg}`,
            cardFocus: false,
        },
        {
            id: crypto.randomUUID(),
            name: 'Favoritos',
            img: `${favoritesImg}`,
            cardFocus: false,
        },
        {
            id: crypto.randomUUID(),
            name: 'Perfil',
            img: `${profileImg}`,
            cardFocus: false,
        },
    ]
    )

    return (
        <AsideContext value={{
            asideCards,
        }}>
            {children}
        </AsideContext>
    )
}