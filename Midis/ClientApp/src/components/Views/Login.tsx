import Pateo from "pateo";
import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { LabeledInput } from "../Form/LabeledInput";

export class Login extends React.PureComponent {

    static displayName = Login.name;

    form = new Pateo.Form("login");

    render = () => {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col sm={6} md={5} lg={4} xl={3}>
                        <div className="fs-4 fw-semibold mt-md-1 mt-lg-2 mt-xl-3 mt-xxl-4 mb-2 mb-lg-3">
                            Log in
                        </div>
                        <this.form.Form>
                            <this.form.Field
                                component={LabeledInput}
                                name="username"
                                placeholder="Username"
                            />
                            <this.form.Field
                                component={LabeledInput}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            <Button onClick={() => this.form.submit()}>
                                Submit
                            </Button>
                        </this.form.Form>
                    </Col>
                </Row>
            </Container>
        );
    }

}
