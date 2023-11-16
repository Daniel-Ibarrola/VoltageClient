import Spinner from "react-bootstrap/Spinner";

export const LoadSpinner = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    );
};
