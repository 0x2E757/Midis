import React from "react";
import { NavMenu } from "./NavMenu";

type Props = {
    children: JSX.Element,
};

export function Layout(props: Props) {

    return (
        <div>
            <NavMenu />
            {props.children}
        </div>
    );

}
