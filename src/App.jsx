import { useContext } from "react";
import {Route, Routes, Link, Navigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import RBNavbar from "react-bootstrap/Navbar";

import { Stations } from "./Stations/index.js";
import { Station } from "./Station/index.js";
import {
    Confirm,
    ChangePass,
    Login,
    Logout,
    Protected,
    Reconfirm,
    Register,
    Reset,
    ResetPassword,
} from "./Auth/index.js";
import AuthContext from "./Auth/Context/AuthProvider.jsx";

const NoMatch = () => {
    return <h1>Aqui no hay nada: 404</h1>
}


const UserDropDown = () => {
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
                      <Link to={"/change"}>Cambiar contraseña</Link>
                  </NavDropdown.Item>
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


const NavBar = () => {

    const { token } = useContext(AuthContext);

    return (
    <RBNavbar bg="dark">
        <Container>
            <RBNavbar.Brand className="navbar">
                <Link to={"/stations"}>
                    <img
                        alt=""
                        src="../public/cires.png"
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

const fetchTime = 3600 * 1000;  // One hour
// const fetchTime = 120 * 1000;  // Two minutes

const Home = () => {

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
                <Route index element={<Home />} />
                <Route
                    path="stations"
                    element={
                    <Protected>
                        <Stations fetchTime={fetchTime}/>
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
                <Route
                    path="change"
                    element={
                        <Protected>
                            <ChangePass />
                        </Protected>
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="register" element={<Register />} />
                <Route path="confirm/:token" element={<Confirm />}/>
                <Route path="reconfirm" element={<Reconfirm />} />
                <Route path="resetpassword" element={<Reset />} />
                <Route path="reset/:token" element={<ResetPassword />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
};


export { App };
