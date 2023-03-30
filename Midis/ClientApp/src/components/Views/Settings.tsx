import React, { useEffect, useRef, useState } from "react";
import { useForm } from "pateo";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import { Input, LabeledInput } from "../Form";
import { Breadcrumb } from "../Breadcrumb";
import w from "../../wrappers";
import api from "../../api";

export function Settings() {

    const [loading, setLoading] = useState(true);
    const form = useForm("settings");
    const formFetchHandle = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        formFetchHandle.current = api.settings.get()
            .then((data) => {
                form.setValues(data);
                setLoading(false);
            })
    }, [form]);

    form.onSubmit = (values) => {
        setLoading(true);
        formFetchHandle.current = api.settings.post(values)
            .then((data: any) => {
                console.log(data);
                form.setValues(data);

                w.toast.add(<div>Settings were updated.</div>, "success");
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

    const onCancelClick = () => {
        navigate("/");
    }

    return (
        <Container>
            <Breadcrumb items={[
                { name: "Home", to: "/" },
                { name: "Settings" },
            ]} />
            <h1>Application Settings</h1>
            <form.Form className="mt-3">

                <Row>
                    <Col lg={6}>

                        <div className="fs-5 fw-semibold mb-2">
                            Allowed extensions
                        </div>

                        <Row>
                            <form.FieldArray name="allowedExtensions">
                                {({ names, push, remove }) => (
                                    <>
                                        {names.map((name, index) => (
                                            <Col key={index} sm={4}>
                                                <form.Field
                                                    component={Input}
                                                    onKeyDown={onInputKeyDown}
                                                    name={name}
                                                    placeholder="Extension"
                                                    onCrossClick={() => remove(index)}
                                                    disabled={loading}
                                                />
                                            </Col>
                                        ))}

                                        <Col sm={4}>
                                            <Button className="btn-lightgray py-3 w-100 mb-3" onClick={() => push()} disabled={loading}>
                                                Add
                                            </Button>
                                        </Col>
                                    </>
                                )}
                            </form.FieldArray>
                        </Row>

                    </Col>
                    <Col lg={6}>

                        <div className="fs-5 fw-semibold mb-2">
                            Maximum file size
                        </div>

                        <form.Field
                            component={LabeledInput}
                            onKeyDown={onInputKeyDown}
                            name="maximumFileSize"
                            placeholder="Kilobytes"
                            disabled={loading}
                        />

                        <div className="fs-5 fw-semibold mb-2">
                            Minimum image size
                        </div>

                        <Row>
                            <Col sm={6}>
                                <form.Field
                                    component={LabeledInput}
                                    onKeyDown={onInputKeyDown}
                                    name="minimumImageWidth"
                                    placeholder="Width"
                                    disabled={loading}
                                />
                            </Col>
                            <Col sm={6}>
                                <form.Field
                                    component={LabeledInput}
                                    onKeyDown={onInputKeyDown}
                                    name="minimumImageHeight"
                                    placeholder="Height"
                                    disabled={loading}
                                />
                            </Col>
                        </Row>

                        <div className="fs-5 fw-semibold mb-2">
                            Maximum image size
                        </div>

                        <Row>
                            <Col sm={6}>

                                <form.Field
                                    component={LabeledInput}
                                    onKeyDown={onInputKeyDown}
                                    name="maximumImageWidth"
                                    placeholder="Width"
                                    disabled={loading}
                                />

                            </Col>
                            <Col sm={6}>

                                <form.Field
                                    component={LabeledInput}
                                    onKeyDown={onInputKeyDown}
                                    name="maximumImageHeight"
                                    placeholder="Height"
                                    disabled={loading}
                                />

                            </Col>
                        </Row>

                    </Col>
                </Row>

                <div className="d-flex justify-content-center">

                    <Button className="btn-success" onClick={() => form.submit()} disabled={loading}>
                        {loading && (
                            <Spinner size="sm" className="me-1">
                                Loading...
                            </Spinner>
                        )}
                        Save
                    </Button>

                    <Button className="btn-danger" onClick={onCancelClick} disabled={loading}>
                        Cancel
                    </Button>

                </div>

            </form.Form >
        </Container >
    );

}
