import {useContext, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {formPasswordValidation} from "../../utils/index.js";
import {FailAlert} from "../../components/index.js";
import AuthContext from "../../context/AuthProvider.jsx";
import {updateUserPassword} from "../../services/index.js";


export const UpdatePassword = () => {
  const { session } = useParams();
  const { token, updateToken } = useContext(AuthContext);
  const [ error, setError ] = useState("");

  const newPasswordValidation = (values) => {
    return formPasswordValidation(values, "newPassword")
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validate: newPasswordValidation,
    onSubmit: async (values) => await handleSubmit(values),
  });

  const handleSubmit = async (values) => {
      const response = await updateUserPassword(values.email, values.newPassword, session);
      if (response.error) {
        setError(response.message);
      } else {
        updateToken(response.token);
      }
  };

  if (token) {
    return <Navigate to="/"/>
  }

  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={{span: 6}}>
            <Card className="login-card">
              <Card.Title className="login-title">Actualizar Contraseña</Card.Title>
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
                    <Form.Label htmlFor="newPassword">Nueva contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nueva Contraseña"
                        id="newPassword"
                        className="login-row"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        isValid={formik.touched.newPassword && !formik.errors.newPassword}
                        isInvalid={formik.errors.hasOwnProperty("newPassword")}
                    />
                    <Form.Control.Feedback className="form-error" type="invalid">
                      {formik.errors.newPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-grid gap-2 login-button">
                    <Button
                        type="submit"
                    >
                      Actualizar contraseña
                    </Button>
                  </div>
                </Form>
                {error &&
                    <FailAlert className="login-row">
                      <p><strong>Error:</strong> {error}</p>
                    </FailAlert>
                }
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
