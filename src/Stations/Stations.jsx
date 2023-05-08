import axios from "axios";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";

import './style.css'
import { actions, stationsReducer } from "./stationsReducer.js";
import station_names from "../shared/station_names.js";
import { Table } from "./Table/index.js";
import { SearchForm } from "./SearchForm/index.js";


const baseUrl = "http://localhost:5000/api/v1";
const lastReportsURL = baseUrl + "/lastreports";
const fetchTime = 3600 * 1000;  // One hour

const initialStations =  Object.values(station_names).map(st => (
    {
        name: st,
        date: null,
        battery: null,
        panel: null,
    }
));

const Stations = () => {

    const [stations, dispatchStations] = React.useReducer(
        stationsReducer,
        {
            data: initialStations,
            display: initialStations,  // This is the data that will be displayed by the table
            isLoading: false,
            isError: false,
            searchTerm: "",
        }
    );

    const fetchLastReports = async () => {
        dispatchStations({type: actions.initFetch});
        try {
            const result = await axios.get(lastReportsURL);
            dispatchStations({
                type: actions.successFetch,
                payload: result.data,
            })
        } catch {
            dispatchStations({ type: actions.failFetch });
        }
    }

    React.useEffect( () => {
        fetchLastReports();
        const interval = setInterval(() => {
            fetchLastReports();
            console.log("Fetched last reports");
        }, fetchTime);
        return () => clearInterval(interval);
    }, []);

    const handleSearchInput = (event) => {
        dispatchStations({
            type: actions.setSearch,
            payload: event.target.value
        });
    };

    const handleSearchSubmit = (event) => {
        dispatchStations({type: actions.search});
        event.preventDefault();
    }

    // TODO: add load spinners
    return (
        <>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand className="navbar">
                              <img
                                  alt=""
                                  src="../../public/vite.svg"
                                  width="30"
                                  height="30"
                                  className="d-inline-block align-top"
                              /> Monitor de Estaciones
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        <h1>Estaciones</h1>
                    </Col>
                </Row>

                {stations.isError && <p>Error: No se pudo cargar los últimos datos</p>}
                {stations.isLoading && <p>Cargando los útlimos datos</p>}

                <SearchForm
                    searchTerm={stations.searchTerm}
                    onSearchInput={handleSearchInput}
                    onSearchSubmit={handleSearchSubmit}
                />

                <Row>
                    <Col>
                        <Table data={stations.display}/>
                    </Col>
                </Row>
            </Container>
        </>

    );
}

export { Stations };