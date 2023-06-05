import { useReducer, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {Link, Navigate} from "react-router-dom";

import AuthContext from "./AuthProvider.jsx";
import { loginReducer, actions } from "./loginReducer.js";
import { tokensUrl } from "../shared/index.js";
import "./style.css";



const Login = () => {

    const [loginData, dispatchLoginData] = useReducer(loginReducer, {
        email: "",
        password: "",
        isError: false,
    });
    const { token, setToken } = useContext(AuthContext);

    if (token) {
        return <Navigate to="/"/>
    }

    const handleEmailChange = (event) => {
        dispatchLoginData({
            type: actions.setEmail,
            payload: event.target.value
        });
    }

    const handlePasswordChange = (event) => {
        dispatchLoginData({
            type: actions.setPassword,
            payload: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                tokensUrl,
                {},
                { auth: {
                    username: loginData.email,
                    password: loginData.password,
                }
            });
            dispatchLoginData({
                type: actions.successLogin,
            });
            setToken(response.data.token);
        } catch (err) {
            console.log(err);
            dispatchLoginData({
                type: actions.errorLogin,
            });
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
                                            <Form.Label htmlFor="email">Correo</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder={"Email"}
                                                id="email"
                                                onChange={handleEmailChange}
                                                required
                                                className="login-row"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="password">Contraseña</Form.Label>
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
                                                disabled={false}
                                            >
                                                Iniciar sesión
                                            </Button>
                                        </div>
                                    </Form>
                                    <Card.Text>
                                        <Link to="/register">Crear una cuenta</Link>
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                </Col>
            </Row>
        </Container>
    )
};


export { Login };