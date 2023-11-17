import { useReducer, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, Navigate } from "react-router-dom";

import AuthContext from "../../context/AuthProvider.jsx";
import { SuccessAlert, FailAlert } from "../../components/index.js";
import { loginReducer, LOGIN_ACTIONS } from "../../reducers/index.js";
import { logInUser } from "../../services/index.js";

import "./style.css";


const Login = () => {

    const [loginData, dispatchLoginData] = useReducer(loginReducer, {
        email: "",
        password: "",
        errorMsg: "",
        session: ""
    });
    const { token, updateToken } = useContext(AuthContext);

    if (token) {
        return <Navigate to="/"/>
    }

    const handleEmailChange = (event) => {
        dispatchLoginData({
            type: LOGIN_ACTIONS.SET_EMAIL,
            payload: event.target.value
        });
    }

    const handlePasswordChange = (event) => {
        dispatchLoginData({
            type: LOGIN_ACTIONS.SET_PASSWORD,
            payload: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginResponse = await logInUser(loginData.errorMsg, loginData.password);
        if (loginResponse.error){
            dispatchLoginData({
                type: LOGIN_ACTIONS.ERROR,
                payload: loginResponse.message
            });
        } else if (!loginResponse.error && loginResponse.token){
            dispatchLoginData({
                type: LOGIN_ACTIONS.SUCCESS,
            });
            updateToken(loginResponse.token);
        } else {
            dispatchLoginData({
                type: LOGIN_ACTIONS.UPDATE_PASSWORD,
                payload: loginResponse.session
            });
        }
    }

    const handleSkipLogin = () => {
        // Skip login when developing
        if (import.meta.env.DEV){
            updateToken({"token": "testToken"});
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 6}}>
                        <Card className="login-card">
                            <Card.Title className="login-title">Iniciar Sesión</Card.Title>
                            <hr />
                            <Card.Body className="login-body">
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
                                                placeholder="Correo"
                                                id="email"
                                                onChange={handleEmailChange}
                                                required
                                                className="login-row"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label
                                                htmlFor="password"
                                                className="form-label"
                                            >
                                                Contraseña
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Contraseña"
                                                id="password"
                                                onChange={handlePasswordChange}
                                                required
                                                className="login-row"
                                            />
                                        </Form.Group>
                                        <div className="d-grid gap-2 login-button">
                                            <Button
                                                type="submit"
                                                disabled={!loginData.email || !loginData.password}
                                            >
                                                Iniciar sesión
                                            </Button>
                                        </div>
                                    </Form>
                                    <Card.Text>
                                        <Link to="/register">Crear una cuenta</Link>
                                    </Card.Text>
                                    <Card.Text>
                                        <Link to="/resetpassword">¿Olvidó su contraseña?</Link>
                                    </Card.Text>
                                {loginData.session &&
                                    <SuccessAlert className="login-row">
                                        Se requiere actualizar la contraseña
                                    </SuccessAlert>
                                }
                                {loginData.errorMsg &&
                                    <FailAlert className="login-row">
                                        <p><strong>Error:</strong> {loginData.errorMsg}</p>
                                    </FailAlert>
                                }
                                {import.meta.env.DEV &&
                                    <Button
                                        variant="danger"
                                        onClick={handleSkipLogin}
                                    >
                                        Skip login
                                    </Button>
                                }
                            </Card.Body>
                        </Card>
                </Col>
            </Row>
        </Container>
    )
};


export { Login };