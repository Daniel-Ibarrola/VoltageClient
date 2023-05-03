import axios from "axios";
import * as React from "react";

import './App.css'
import { actions, stationsReducer } from "./stationsReducer.js";
import stations from "../shared/stations.js";
import { Table } from "../Table/index.js";
import { SearchForm } from "../SearchForm/index.js";


const baseUrl = "http://localhost:5000/api/v1"
const lastReportsURL = baseUrl + "/lastreports"
const fetchTime = 3600 * 1000  // One hour

const initialStations =  Object.values(stations).map(st => (
    {
        name: st,
        date: null,
        battery: null,
        panel: null,
    }
));

const App = () => {

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

    return (
        // TODO: add navbar
        <div>
            <h1>Monitor de Estaciones</h1>

            {stations.isError && <p>No se pudo cargar los últimos datos</p>}
            {stations.isLoading && <p>Cargando los útlimos datos</p>}

            <SearchForm
                searchTerm={stations.searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />
            <Table data={stations.display}/>
        </div>
    );
}

export { App };