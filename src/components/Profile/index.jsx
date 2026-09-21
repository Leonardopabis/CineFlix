import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthProvider/AuthContext'
import styles from './profile.module.css'

export function Profile() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/auth/login')
    }

    return (
        <div className={styles.profile}>
            <h2>Olá, {user?.name}!</h2>

            <button className={styles.logoutButton} onClick={handleLogout}>
                Sair
            </button>
        </div>
    )
}