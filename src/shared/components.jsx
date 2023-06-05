import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export const LoadSpinner = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    );
};

export const FailAlert = ({ msg }) => {
    return (
        <Alert key={"failFetch"} variant={"danger"}>
            <strong>Error:</strong> {msg}
        </Alert>
    );
};
