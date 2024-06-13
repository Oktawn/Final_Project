import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page_404 } from "./pages/Page_404";
import Main from "./pages/Main";
import MainLayout from "../layouts/MainLayout";
import Login from "./pages/Login";
import Loading from "./pages/loading";

function Router() {
    return (
        <div >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/" element={<Loading />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="*" element={<Page_404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;