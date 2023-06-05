import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./style.css";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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