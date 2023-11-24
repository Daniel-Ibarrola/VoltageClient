import Alert from "react-bootstrap/Alert";


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