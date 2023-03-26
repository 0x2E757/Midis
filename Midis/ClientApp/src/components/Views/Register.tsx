import React, { useEffect, useRef, useState } from "react";
import { useForm } from "pateo";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { LabeledInput } from "../Form/LabeledInput";
import w from "../../wrappers";
import api from "../../api";

export function Register() {

    const [loading, setLoading] = useState(false);
    const formFetchHandle = useRef(null);
    const form = useForm("register");
    const navigate = useNavigate();

    form.onSubmit = (values) => {
        setLoading(true);
        formFetchHandle.current = api.user.register(values)
            .then((data: any) => {
                w.user.data.set(data);
                w.toast.add(<div>Successfully registered.</div>, "success");
                navigate("/");
            })
            .catch((response: any) => {
                form.setSubmissionErrors(response.errors);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        return () => {
            formFetchHandle.current?.cancel();
        }
    }, []);

    const onInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            form.submit();
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={6} md={5} lg={4} xl={3}>
                    <div className="fs-4 fw-semibold mt-md-1 mt-lg-2 mt-xl-3 mt-xxl-4 mb-2 mb-lg-3">
                        Register
                    </div>
                    <form.Form>
                        <form.Field
                            component={LabeledInput}
                            onKeyDown={onInputKeyDown}
                            name="username"
                            placeholder="Username"
                        />
                        <form.Field
                            component={LabeledInput}
                            onKeyDown={onInputKeyDown}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <form.Field
                            component={LabeledInput}
                            onKeyDown={onInputKeyDown}
                            name="password_confirm"
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <Button className="btn-success" onClick={() => form.submit()} disabled={loading}>
                            {loading && (
                                <Spinner size="sm" className="me-1">
                                    Loading...
                                </Spinner>
                            )}
                            Register
                        </Button>
                    </form.Form>
                </Col>
            </Row>
        </Container>
    );

}
