import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css"

const Register = () => {
    // TODO: add form validation

    const handleEmailChange = (event) => {
        console.log(event.target.value);
    }

    const handlePassswordChange = (event) => {
        console.log(event.target.value);
    }

    const handleSumbit = (event) => {
        event.preventDefault();
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{span: 6}}>
                    <Card className="login-card">
                        <Card.Title className="login-title">Registrarse</Card.Title>
                        <hr />
                        <Card.Body className="login-body">
                            <Form onSubmit={handleSumbit}>
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
                                        onChange={handlePassswordChange}
                                        required
                                        className="login-row"
                                    />
                                    <Form.Text muted className="password-text">
                                        Su contraseña debe tener entre 8-20 caracteres, contener
                                        letras y numeros, y no debe contener espacios.
                                    </Form.Text>
                                </Form.Group>
                                <div className="d-grid gap-2 login-button">
                                    <Button type="submit">Crear cuenta</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export { Register };