import { Outlet } from 'react-router-dom'
import { Aside } from '../../../components/Aside'
import styles from './app-layout.module.css'

export function AppLayout() {
    return (
        <div className={styles.contentContainer}>
            <Aside />
            <Outlet/>
        </div>
    )
}