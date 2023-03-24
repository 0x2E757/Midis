import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Views/Home";
import { Login } from "./components/Views/Login";
import { Register } from "./components/Views/Register";
import "./custom.css";

export default class App extends React.PureComponent {

    static displayName = App.name;

    render = () => {
        return (
            <Layout>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        );
    }

}
