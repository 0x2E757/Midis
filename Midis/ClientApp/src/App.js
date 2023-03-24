import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import "./custom.css";

export default class App extends Component {
    static displayName = App.name;

    render() {
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
