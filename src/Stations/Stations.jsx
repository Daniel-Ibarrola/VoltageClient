import axios from "axios";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import './style.css'
import { actions, stationsReducer } from "./stationsReducer.js";
import { Table } from "./Table/index.js";
import { SearchForm } from "./SearchForm/index.js";
import station_names from "../shared/station_names.js";
import { lastReportsUrl } from "../shared/index.js";
import { LoadSpinner, FailAlert } from "../shared/index.js";


const initialStations =  Object.values(station_names).map(st => (
    {
        name: st,
        date: null,
        battery: null,
        panel: null,
    }
));

const Stations = ({ fetchTime }) => {

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
            const result = await axios.get(lastReportsUrl);
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
            type: actions.search,
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

                {stations.isError && <FailAlert />}
                {stations.isLoading && <LoadSpinner />}

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

export { Stations };