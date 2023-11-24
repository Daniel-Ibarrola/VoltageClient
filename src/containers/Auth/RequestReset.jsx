import {useReducer} from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {FailAlert} from "../../components/index.js";
import {LOGIN_ACTIONS, loginReducer} from "../../reducers/index.js";
import {requestPasswordReset} from "../../services/index.js";


const RequestReset = () => {
    const [loginData, dispatchLoginData] = useReducer(loginReducer, {
        email: "",
        password: "",
        errorMsg: "",
    });

    const handleEmailChange = (event) => {
        dispatchLoginData({
            type: LOGIN_ACTIONS.SET_EMAIL,
            payload: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await requestPasswordReset(loginData.email);
        if (success) {
            alert("Se ha enviado un email de confirmación");
            dispatchLoginData({
                type: LOGIN_ACTIONS.SUCCESS
            });
        } else {
            dispatchLoginData({
                type: LOGIN_ACTIONS.ERROR,
                payload: "Error al solicitar recuperación de contraseña"
            });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 6}}>
                    <Card className="login-card">
                        <Card.Title className="login-title">Recuperación de contraseña</Card.Title>
                        <hr />
                        <Card.Body className="login-body">
                            <Card.Text>Solicitar recuperación de contraseña.</Card.Text>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Correo
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder={"Email"}
                                        id="email"
                                        onChange={handleEmailChange}
                                        required
                                        className="login-row"
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2 login-button">
                                    <Button
                                        type="submit"
                                        disabled={!loginData.email}
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            </Form>
                            {loginData.errorMsg &&
                                <FailAlert className="login-row">
                                    <p><strong>Error:</strong> {loginData.errorMsg}</p>
                                </FailAlert>
                            }
                            <Card.Text>
                                <Link to="/reset">Resetear contraseña</Link>
                            </Card.Text>
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

export { RequestReset };
