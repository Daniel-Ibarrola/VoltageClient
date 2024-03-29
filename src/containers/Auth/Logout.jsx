import {useContext} from "react";
import {Navigate} from "react-router-dom";

import AuthContext from "../../context/AuthProvider.jsx";


const Logout = () => {

    const { clearToken } = useContext(AuthContext);
    clearToken();
    return <Navigate to="/"/>
};

export { Logout };
