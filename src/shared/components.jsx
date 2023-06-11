import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export const LoadSpinner = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    );
};

export const FailAlert = ({ children }) => {
    return (
        <Alert key="failFetch" variant="danger">
            {children}
        </Alert>
    );
};


export const SuccessAlert = ({ children }) => {
    return (
        <Alert key="successAlert" variant="primary">
            {children}
        </Alert>
    );
};
