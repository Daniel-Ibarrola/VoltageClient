import {useState} from "react";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {FailAlert, SuccessAlert} from "../../components/index.js";
import {formPasswordValidation} from "../../utils/index.js";
import {resetUserPassword} from "../../services/index.js";


const ResetPassword = () => {
    const [status, setStatus] = useState({success: false, msg: ""});

    const handleSubmit = async (values) => {
        const success = await resetUserPassword(values.email, values.password, values.confirmationCode);
        if (success) {
            setStatus({success: success, msg: "Se ha reseteado la contraseña."});
        } else {
            setStatus({success: success, msg: "Error al resetear la contraseña."});
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmationCode: "",
        },
        validate: formPasswordValidation,
        onSubmit: async (values) => await handleSubmit(values),
    })

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 6}}>
                    <Card className="login-card">
                        <Card.Title className="login-title">Resetear Contraseña</Card.Title>
                        <hr />
                        <Card.Body className="login-body">
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="email">Correo</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Correo"
                                        id="email"
                                        className="login-row"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">Nueva contraseña</Form.Label>
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

                                <Form.Group>
                                    <Form.Label htmlFor="confirmationCode">Código de Confirmación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Código de confirmación"
                                        id="confirmationCode"
                                        className="login-row"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmationCode}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2 login-button">
                                    <Button
                                        type="submit"
                                    >
                                        Resetear contraseña
                                    </Button>
                                </div>
                                {(!status.success && status.msg)
                                    && <FailAlert>{status.msg}</FailAlert>
                                }
                                {(status.success && status.msg)
                                    && <SuccessAlert>{status.msg}</SuccessAlert>
                                }
                            </Form>
                            <Card.Text>
                                <Link to="/">Volver al inicio</Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export { ResetPassword };