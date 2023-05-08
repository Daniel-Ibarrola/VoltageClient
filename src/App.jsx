import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import RBNavbar from "react-bootstrap/Navbar";

import { Stations } from "./Stations/index.js";
import { Station } from "./Station/index.js";

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


const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<Stations />} />
                <Route path="stations" element={<Stations />} />
                <Route path="stations/:stationName" element={<Station />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};


export { App };
