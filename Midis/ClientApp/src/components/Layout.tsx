import React from "react";
import { NavMenu } from "./NavMenu";

interface IProps {
    children: JSX.Element;
}

export class Layout extends React.PureComponent<IProps> {

    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                {this.props.children}
            </div>
        );
    }

}
