import React, { useState } from "react";
import { useWrapper } from "pateo";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import w from "../wrappers";
import "./NavMenu.css";

export function NavMenu() {

    const [collapsed, setCollapsed] = useState(true);
    const [userData, setUserData] = useWrapper(w.user.data);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    const hideNavbar = () => {
        setCollapsed(true);
    }

    const onClickLogOut = () => {
        hideNavbar();
        setUserData(null);
        w.toast.add(<div>Successfully logged out.</div>, "success");
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">Midis</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/" onClick={hideNavbar}>
                                Home
                            </NavLink>
                        </NavItem>
                        {userData === null && (<>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/login" onClick={hideNavbar}>
                                    Log in
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/register" onClick={hideNavbar}>
                                    Register
                                </NavLink>
                            </NavItem>
                        </>)}
                        {userData !== null && (<>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/" onClick={onClickLogOut}>
                                    Log out
                                </NavLink>
                            </NavItem>
                        </>)}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );

}
