import React, { useEffect, useRef, useState } from "react";
import { useForm } from "pateo";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { LabeledInput } from "../Form";
import w from "../../wrappers";
import api from "../../api";

export function Login() {

    const [loading, setLoading] = useState(false);
    const form = useForm("login");
    const formFetchHandle = useRef(null);
    const navigate = useNavigate();

    form.onSubmit = (values) => {
        setLoading(true);
        formFetchHandle.current = api.user.login(values)
            .then((data: any) => {
                w.user.data.set(data);
                w.toast.add(<div>Successfully logged in as <b>{data.username}</b>.</div>, "success");
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
                        Log in
                    </div>
                    <form.Form>
                        <form.Field
                            component={LabeledInput}
                            onKeyDown={onInputKeyDown}
                            name="username"
                            placeholder="Username"
                            disabled={loading}
                        />
                        <form.Field
                            component={LabeledInput}
                            onKeyDown={onInputKeyDown}
                            name="password"
                            type="password"
                            placeholder="Password"
                            disabled={loading}
                        />
                        <Button className="btn-success" onClick={() => form.submit()} disabled={loading}>
                            {loading && (
                                <Spinner size="sm" className="me-1">
                                    Loading...
                                </Spinner>
                            )}
                            Submit
                        </Button>
                    </form.Form>
                </Col>
            </Row>
        </Container>
    );

}
