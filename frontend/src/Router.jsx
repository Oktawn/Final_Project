import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page_404 } from "./pages/Page_404";
import Main from "./pages/Main";
import MainLayout from "../layouts/MainLayout";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Main />} />

                </Route>

                <Route path="*" element={<Page_404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;