import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import {
    Home,
    Login,
    Logout,
    RequestReset,
    ResetPassword,
    Station,
    UpdatePassword
} from "./containers/index.js";
import AuthContext from "./context/AuthProvider.jsx";
import { NavBar, Protected } from "./components/index.js";


const NoMatch = () => {
    return <h1>Aqui no hay nada: 404</h1>
}


const fetchTime = 3600 * 1000;  // One hour
// const fetchTime = 120 * 1000;  // Two minutes

const Index = () => {

    const { token } = useContext(AuthContext);
    if (!token){
        return <Navigate to="/login"/>;
    }

    return <Navigate to={"/stations"} />;
}


const App = () => {

    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<Index />} />
                <Route
                    path="stations"
                    element={
                    <Protected>
                        <Home fetchTime={fetchTime}/>
                    </Protected>
                }
                />
                <Route
                    path="stations/:stationName"
                    element={
                    <Protected>
                        <Station fetchTime={fetchTime} />
                    </Protected>
                }
                />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="updatepassword/:session" element={<UpdatePassword />} />
                <Route path="resetpassword" element={<RequestReset />} />
                <Route path="reset" element={<ResetPassword />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};


export { App };
