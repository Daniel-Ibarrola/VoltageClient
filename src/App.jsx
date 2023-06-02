import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import RBNavbar from "react-bootstrap/Navbar";

import { Stations } from "./Stations/index.js";
import { Station } from "./Station/index.js";
import { Login, Protected } from "./Auth/index.js";

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

const Home = ({isLoggedIn}) => {

    return (
        <>
            {isLoggedIn ? <Stations fetchTime={fetchTime} /> : <Login />}
        </>
    );
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
                    element={<Protected><Stations fetchTime={fetchTime}/></Protected>}
                />
                <Route
                    path="stations/:stationName"
                    element={<Protected><Station fetchTime={fetchTime} /></Protected>}
                />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};


export { App };
