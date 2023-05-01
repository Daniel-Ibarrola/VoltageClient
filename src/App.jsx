import * as React from "react";
import './App.css'
import stations from "./stations.js";
import axios from "axios";


const lastReportTime = (dateStr) => {
    const date = new Date(dateStr);
    if (date <= 1) {return "Hace unos minutos";}
    if (date < 6) {return "Hace menos de 6 hrs";}
    if (date < 12) {return "Hace menos de 12 hrs";}
    if (date < 24) {return "Hace menos de 24 horas";}
    else {return "Hace más de 24 hrs"}
}


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
                            <td>{st.battery.toFixed(2)}</td>
                            <td>{st.panel.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

const baseUrl = "http://localhost:5000/api/v1"
const lastReportsURL = baseUrl + "/lastreports"



const App = () => {

    const [stationData, setStationData] = React.useState(
        stations.map(st => (
            {
                name: st,
                date: "-",
                battery: "-",
                panel: "-",
            }
        ))
    );

    // TODO: Show data is loading
    React.useEffect( () => {
        async function fetchLastReports() {
            try {
                const result = await axios.get(lastReportsURL);
                setStationData(result.data);
            } catch {
                console.log("Failed to fetch last reports");
            }
        }
        fetchLastReports();
    }, [stationData]);

    return (
        // TODO: add navbar
        <div>
            <h1>Monitor de Estaciones</h1>
            <Table data={stationData}/>
        </div>
    );
}

export default App;
