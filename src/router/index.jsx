import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { SearchPage } from "../components/SearchPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { InfoModal } from "../components/InfoModal";
import { Favorites } from "../components/Favorites";
import { Movies } from "../components/Movies";
import { Series } from "../components/Series";
import { Profile } from "../components/Profile";
import { Register } from "../components/Auth/Register";
import { Login } from "../components/Auth/Login";
import { AuthLayout } from "../layouts/Auth/AuthLayout";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth" element={<AuthLayout/>}>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                    {/* <Route path="logout" element={<logout/>}/> */}
                </Route>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route index element={<App/>}/>
                    <Route path="search" element={<SearchPage/> }/>
                    <Route path="favorites" element={<Favorites/>}/>
                    <Route path="movies" element={<Movies/>}/>
                    <Route path="series" element={<Series/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
                <InfoModal/>
        </BrowserRouter>
    )
}