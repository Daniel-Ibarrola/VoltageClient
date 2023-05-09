import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export const LoadSpinner = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    );
};

export const FailAlert = () => {
    return (
        <Alert key={"failFetch"} variant={"danger"}>
            Error: No se pudo cargar los últimos datos
        </Alert>
    )
}
