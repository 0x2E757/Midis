import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Counter } from "./components/Views/Counter";
import { Home } from "./components/Views/Home";
import "./custom.css";

export default class App extends React.PureComponent {

    static displayName = App.name;

    render = () => {
        return (
            <Layout>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/counter" element={<Counter />} />
                </Routes>
            </Layout>
        );
    }

}
