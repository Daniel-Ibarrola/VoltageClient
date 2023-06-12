import { useEffect, useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import {reconfirmUrl} from "../../shared/index.js";



const Confirm = () => {
    const { token } = useParams();
    const [confirmStatus, setConfirmStatus] = useState("");

    const requestConfirmation = async () => {

    }

    return (
        <Container>
            <h2>Confirmación de cuenta</h2>
            <Link to="/">Volver al inicio</Link>
        </Container>
    )
}

const Reconfirm = () => {

    const { state } = useLocation();
    const [confirmStatus, setConfirmStatus] = useState("");

    const requestConfirmation = async () => {
        if (state.email && state.password) {
            try {
                await axios.get(
                    reconfirmUrl,
                    {
                        auth: {
                            username: state.email,
                            password: state.password,
                        }
                    }
                );
                setConfirmStatus("Se ha enviado un email de confirmación");
            } catch (error) {
                setConfirmStatus("Error al enviar email de confirmación");
            }
        }
    };

    useEffect(() => {
        requestConfirmation();
    }, []);

    return (
        <Container>
            <h2>Confirmación de cuenta</h2>
            <p>{confirmStatus}</p>
            <Link to="/">Volver al inicio</Link>
        </Container>
    )

};


export { Confirm, Reconfirm };
