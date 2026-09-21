import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../AuthProvider/AuthContext'
import styles from './login.module.css'

export function Login() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        try {
            await login(email, password)
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>Entrar</h2>

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit">Entrar</button>
                </form>

                <p className={styles.footerText}>
                    Não tem conta? <Link to="/auth/register">Cadastre-se</Link>
                </p>
            </div>
        </div>
    )
}