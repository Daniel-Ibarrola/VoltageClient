import * as React from "react";
import {Route, Routes, Link, Navigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import RBNavbar from "react-bootstrap/Navbar";

import { Stations } from "./Stations/index.js";
import { Station } from "./Station/index.js";
import { Login, Protected, Register } from "./Auth/index.js";

const NoMatch = () => {
    return <h1>Aqui no hay nada: 404</h1>
}


const NavBar = () => {
    return (
    <RBNavbar bg="dark">
        <Container>
            <RBNavbar.Brand className="navbar">
                <Link to={"/stations"}>
                    <img
                        alt=""
                        src="../../public/cires.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    /> Monitor de Estaciones
                </Link>
            </RBNavbar.Brand>
        </Container>
    </RBNavbar>
    );
};

const fetchTime = 3600 * 1000;  // One hour
// const fetchTime = 120 * 1000;  // Two minutes

const Home = ({ isLoggedIn }) => {

    if (!isLoggedIn){
        return <Navigate to="/login"/>;
    }

    return <Navigate to={"/stations"} />;
}


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<Home />} />
                <Route
                    path="stations"
                    element={
                    <Protected isLoggedIn={isLoggedIn}>
                        <Stations fetchTime={fetchTime}/>
                    </Protected>
                }
                />
                <Route
                    path="stations/:stationName"
                    element={
                    <Protected isLoggedIn={isLoggedIn}>
                        <Station fetchTime={fetchTime} />
                    </Protected>
                }
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};


export { App };
