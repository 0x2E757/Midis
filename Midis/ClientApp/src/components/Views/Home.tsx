import React from "react";
import { useWrapper } from "pateo";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import w from "../../wrappers";
import { Breadcrumb } from "../Breadcrumb";

export function Home() {

    const [username] = useWrapper(w.user.username);
    const [roles] = useWrapper(w.user.roles);

    return (
        <Container>
            <Breadcrumb items={[
                { name: "Home" },
            ]} />
            <h1>{username ? (<>Hello, <b>{username}</b>!</>) : `Hello, stranger!`}</h1>
            {roles.indexOf("Admin") > 0 && (
                <NavLink to="/settings" className="btn btn-primary">Settings</NavLink>
            )}
        </Container>
    );

}
