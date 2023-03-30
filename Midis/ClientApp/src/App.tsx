import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toasts } from "./components/Toasts";
import { Home } from "./components/Views/Home";
import { Login } from "./components/Views/Login";
import { Register } from "./components/Views/Register";
import { Settings } from "./components/Views/Settings";
import "./custom.css";

export default function App() {

    return (<>
        <Layout>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Layout>
        <Toasts />
    </>);

}
