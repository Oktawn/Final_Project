import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page_404 } from "./pages/Page_404";
import Main from "./pages/Main";
import MainLayout from "../layouts/MainLayout";
import { SettingStore } from "./State/useState";
import React, { lazy } from "react";

const Result = lazy(() => import("./pages/Result"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));

function Router() {
  const auth = SettingStore((state) => state.isAuth);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {auth ? (
              <>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/results" element={<Result />} />
                <Route path="/about" element={<About />} />
                <Route path="/account" element={<Account />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/results" element={<Result />} />
                <Route path="/about" element={<About />} />
              </>
            )}
          </Route>
          <Route path="*" element={<Page_404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;