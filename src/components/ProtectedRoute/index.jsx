import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../AuthProvider/AuthContext'
import { AppLayout } from '../../layouts/App/AppLayout'

export function ProtectedRoute() {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <p>Carregando...</p>
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    )
}