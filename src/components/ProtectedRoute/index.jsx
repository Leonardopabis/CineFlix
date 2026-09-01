import { Outlet } from "react-router-dom";
import { AppLayout } from "../../layouts/App/AppLayout";


export function ProtectedRoute() {
    return (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    )
}