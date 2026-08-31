import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { SearchPage } from "../components/SearchPage";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="auth" element={null}>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<login/>}/>
                    <Route path="logout" element={<logout/>}/>
                </Route> */}
                <Route path="/">
                    <Route index element={<App/>}/>
                    <Route path="search" element={<SearchPage/> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}