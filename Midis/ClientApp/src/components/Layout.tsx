import React from "react";
import { Container } from "reactstrap";
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
                <Container tag="main">
                    {this.props.children}
                </Container>
            </div>
        );
    }

}
