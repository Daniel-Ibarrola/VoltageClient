import axios from "axios";
import * as React from "react";

import './App.css'
import {actions, stationsReducer} from "./stationsReducer.js";
import stations from "./stations.js";


const lastReportTime = (dateStr) => {
    if (dateStr === null){
        return "-";
    }
    const date = new Date(dateStr);
    if (date <= 1) {return "Hace unos minutos";}
    if (date < 6) {return "Hace menos de 6 hrs";}
    if (date < 12) {return "Hace menos de 12 hrs";}
    if (date < 24) {return "Hace menos de 24 horas";}
    else {return "Hace más de 24 hrs";}
};

const roundVoltage = (voltage) => {
    if (voltage === null){
        return "-";
    }
    return voltage.toFixed(2);
};

const Table = ({ data }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Estación</th>
                        <th scope="col">Último Reporte</th>
                        <th scope="col">Batería</th>
                        <th scope="col">Panel</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((st, index) => (
                        <tr key={stations[index]}>
                            <td>{stations[index]}</td>
                            <td>{lastReportTime(st.date)}</td>
                            <td>{roundVoltage(st.battery)}</td>
                            <td>{roundVoltage(st.panel)}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit}) => {
    return (
        <form onSubmit={onSearchSubmit}>
            <input
                id="search"
                type="text"
                value={searchTerm}
                autoFocus={true}
                onChange={onSearchInput}
            />
            <button type="submit">Buscar</button>
        </form>
    )
};

const baseUrl = "http://localhost:5000/api/v1"
const lastReportsURL = baseUrl + "/lastreports"

const initialStations =  stations.map(st => (
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


    // TODO: re-fetch data every certain time
    React.useEffect( () => {
        dispatchStations({type: actions.initFetch})
        async function fetchLastReports() {
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
        fetchLastReports();
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

export default App;
