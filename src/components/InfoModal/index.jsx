import { useContext } from 'react'
import styles from './info-modal.module.css'
import ApiContext from '../ApiProvider/ApiContext'

export function InfoModal() {
    const  {infoModalRef, currentInfoMovie, closeInfoModal} = useContext(ApiContext)

    return (
        <dialog className={styles.infoModal} ref={infoModalRef}>
            <h2>{currentInfoMovie.title}</h2>
        </dialog>
    )
}