import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page_404 } from "./pages/Page_404";
import Main from "./pages/Main";
import MainLayout from "../layouts/MainLayout";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Results from "./components/Result/Result";
import About from "./pages/About";
import Account from "./pages/Account";
import { SettingStore } from "./State/useState";

function Router() {

    const auth = SettingStore((state) => state.isAuth);

    return (
        <div >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {auth ?
                            <>
                                <Route path="/" element={<Loading />} />
                                <Route path="/main" element={<Main />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/results" element={<Results />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/account" element={<Account />} />
                            </> :
                            <>
                                <Route path="/" element={<Loading />} />
                                <Route path="/main" element={<Main />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/results" element={<Results />} />
                                <Route path="/about" element={<About />} />
                            </>
                        }
                    </Route>
                    <Route path="*" element={<Page_404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;