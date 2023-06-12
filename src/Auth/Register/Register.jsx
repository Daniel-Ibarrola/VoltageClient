import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style.css"
import { FailAlert, SuccessAlert, registerUrl} from "../../shared/index.js";


const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Requerido';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Correo invalido';
    }

    if (!values.password) {
        errors.password = 'Requerido';
    }
    else {
        let passwordError = "";
        if (values.password.length < 8 || values.password.length > 20){
            passwordError += 'Entre 8 y 20 caractéres. ';
        }
        if (!/[A-Z]+/.test(values.password)) {
            passwordError += 'Al menos una letra mayúscula. ';
        }
        if (!/[a-z]+/.test(values.password)) {
            passwordError += 'Al menos una letra minúscula. ';
        }
        if (/\s+/.test(values.password)) {
            passwordError += 'No debe contener espacios. ';
        }
        if (!/\W+/.test(values.password)) {
            passwordError += 'Al menos un carácter especial. ';
        }

        if (passwordError){
            errors.password = passwordError;
        }
    }

    return errors;
}


const Register = () => {

    const [response, setResponse] = useState({
        error: false,
        msg: "",
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post(
                registerUrl,
                {
                    email: values.email,
                    password: values.password,
                }
            );
            setResponse({
                error: false,
                msg: <p>Se ha enviado un email de confirmación.</p>
            })
        } catch (err) {
            if (err.response){
                if (err.response?.status === 400){
                    setResponse({
                        error: true,
                        msg: <p><strong>Error:</strong> email en uso</p>
                    });
                } else if (err.response?.status === 401){
                    setResponse({
                        error: true,
                        msg: <p><strong>Error:</strong> email inválido</p>
                    });
                }
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => await handleSubmit(values),
    })

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 6}}>
                    <Card className="login-card">
                        <Card.Title className="login-title">Registrarse</Card.Title>
                        <hr />
                        <Card.Body className="login-body">
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="email">Correo</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className="login-row"
                                        isValid={formik.touched.email && !formik.errors.email}
                                        isInvalid={formik.errors.hasOwnProperty("email")}
                                    />
                                    <Form.Control.Feedback className="form-error" type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Contraseña"
                                        id="password"
                                        className="login-row"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        isValid={formik.touched.password && !formik.errors.password}
                                        isInvalid={formik.errors.hasOwnProperty("password")}
                                    />
                                    <Form.Control.Feedback className="form-error" type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-grid gap-2 login-button">
                                    <Button
                                        type="submit"
                                    >
                                        Crear cuenta
                                    </Button>
                                </div>
                                {(response.error && response.msg) && <FailAlert>{response.msg}</FailAlert>}
                                {(!response.error && response.msg) && <SuccessAlert>{response.msg}</SuccessAlert>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export { Register };