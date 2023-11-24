import { useContext } from "react";
import axios from "axios";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FailAlert, LoadSpinner } from "../../components/index.js";
import AuthContext from "../../context/AuthProvider.jsx";
import { STATIONS_ACTIONS, stationsReducer } from "../../reducers/index.js";
import { Table } from "./Table.jsx";
import { SearchForm } from "./SearchForm.jsx";
import { Notifications } from "./Notifications.jsx";
import { reportsUrl } from "../../services/index.js";

import './style.css'


const Home = ({ fetchTime }) => {

    const [stations, dispatchStations] = React.useReducer(
        stationsReducer,
        {
            data: [],
            display: [],  // This is the data that will be displayed by the table
            isLoading: false,
            isError: false,
            searchTerm: "",
        }
    );

    const { token } = useContext(AuthContext);

    const fetchLastReports = async () => {
        dispatchStations({type: STATIONS_ACTIONS.initFetch});
        try {
            const result = await axios.get(
                reportsUrl,
                {headers: {Authorization: `Bearer ${token}`}}
            );
            dispatchStations({
                type: STATIONS_ACTIONS.successFetch,
                payload: result.data,
            })
        } catch {
            dispatchStations({ type: STATIONS_ACTIONS.failFetch });
        }
    }

    React.useEffect( () => {
        fetchLastReports();
        const interval = setInterval(() => {
            fetchLastReports();
        }, fetchTime);
        return () => clearInterval(interval);
    }, []);

    const handleSearchInput = (event) => {
        dispatchStations({
            type: STATIONS_ACTIONS.search,
            payload: event.target.value,
        });
    };

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Estaciones</h1>
                    </Col>
                </Row>

                {stations.isError &&
                    <FailAlert>
                    <p><strong>Error:</strong> No se pudo cargar los últimos datos</p>
                    </FailAlert>
                }
                {stations.isLoading && <LoadSpinner />}

                <Notifications reports={stations.data}/>

                <SearchForm
                    searchTerm={stations.searchTerm}
                    onSearchInput={handleSearchInput}
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

export { Home };