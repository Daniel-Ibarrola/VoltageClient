import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import RBNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";
import {useContext} from "react";

import AuthContext from "../context/AuthProvider.jsx";
import "./style.css";


export const UserDropDown = () => {
    return (
        <RBNavbar.Collapse className={"justify-content-end"}>
            <Nav>
                <NavDropdown
                    title={"Cuenta"}
                    menuVariant="dark"
                    className="nav-dropdown"
                >
                    <NavDropdown.Item
                        as="p"
                        className="nav-dropdown-item"
                    >
                        <Link to={"/logout"}>Cerrar sesión</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </RBNavbar.Collapse>

    )
};


export const NavBar = () => {

    const { token } = useContext(AuthContext);

    return (
        <RBNavbar bg="dark">
            <Container>
                <RBNavbar.Brand className="navbar">
                    <Link to={"/stations"}>
                        <img
                            alt=""
                            src="cires.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        /> Monitor de Estaciones
                    </Link>
                </RBNavbar.Brand>
                {token && <UserDropDown />}
            </Container>
        </RBNavbar>
    );
};