import {useContext} from "react";
import {Navigate} from "react-router-dom";

import AuthContext from "../../context/AuthProvider.jsx";


const Logout = () => {

    const { setToken } = useContext(AuthContext);
    setToken("");
    localStorage.clear();

    return <Navigate to="/"/>
};

export { Logout };
