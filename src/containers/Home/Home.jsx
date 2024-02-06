import { useContext } from "react";
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
import { getLastReports } from "../../services/index.js";

import './style.css'


const Home = ({ fetchTime }) => {

    const [stations, dispatchStations] = React.useReducer(
        stationsReducer,
        {
            data: [],
            display: [],  // This is the data that will be displayed by the table
            isLoading: false,
            error: "",
            searchTerm: "",
        }
    );

    const { token } = useContext(AuthContext);

    const fetchLastReports = async () => {
        dispatchStations({type: STATIONS_ACTIONS.INIT_FETCH});
        const reports = await getLastReports(token);
        if (reports.data.length > 0) {
            dispatchStations({
                type: STATIONS_ACTIONS.SUCCESS_FETCH,
                payload: reports.data,
            });
        } else {
            dispatchStations({
                type: STATIONS_ACTIONS.FAIL_FETCH,
                payload: reports.error
            });
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
            type: STATIONS_ACTIONS.SEARCH,
            payload: event.target.value,
        });
    };

    return (
            <Container>
                <Row>
                    <Col>
                        <h1>Estaciones</h1>
                    </Col>
                </Row>

                {stations.error &&
                    <FailAlert>
                    <p><strong>Error:</strong> {stations.error}</p>
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
    );
}

export { Home };