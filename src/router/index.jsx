import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { SearchPage } from "../components/SearchPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { InfoModal } from "../components/InfoModal";
import { Favorites } from "../components/Favorites";
import { Movies } from "../components/Movies";
import { Series } from "../components/Series";
import { Profile } from "../components/Profile";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="auth" element={null}>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<login/>}/>
                    <Route path="logout" element={<logout/>}/>
                </Route> */}
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route index element={<App/>}/>
                    <Route path="search" element={<SearchPage/> }/>
                    <Route path="favorites" element={<Favorites/>}/>
                    <Route path="movies" element={<Movies/>}/>
                    <Route path="series" element={<Series/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Route>
            </Routes>
                <InfoModal/>
        </BrowserRouter>
    )
}