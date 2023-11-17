import {createContext, useState} from "react";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {

    // TODO: retrieve and save token expiration

    const getToken = () => {
        const tokenString = localStorage.getItem("token");
        return JSON.parse(tokenString);
    };

    const [token, setToken] = useState(getToken);

    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", JSON.stringify(newToken));
    }

    const clearToken = () => {
        setToken("");
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ token, updateToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
