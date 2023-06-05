import { Navigate } from "react-router-dom";
import {useContext} from "react";
import AuthContext from "./AuthProvider.jsx";

const Protected = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token){
        return <Navigate to="/" replace />;
    }
    return children;
};

export { Protected };
