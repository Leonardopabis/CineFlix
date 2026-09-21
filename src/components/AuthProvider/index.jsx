import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            setLoading(false)
            return
        }

        async function loadUser() {
            try {
                const response = await fetch('http://localhost:3000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (!response.ok) {
                    throw new Error('Token inválido')
                }

                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.log('Erro ao validar sessão:', error)
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [token])

    async function login(email, password) {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login')
        }

        localStorage.setItem('token', data.token)
        setToken(data.token)
        setUser(data.user)
    }

    async function register(name, email, password) {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao cadastrar')
        }

        return data
    }

    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext>
    )
}