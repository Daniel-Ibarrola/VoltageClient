import RBTable from "react-bootstrap/Table"

import { lastReportTime, roundVoltage} from "../../utils/numeric.js";
import { Link } from "react-router-dom";
import { STATION_NAMES } from "../../data/index.js";


const Table = ({ data }) => {
    return (
        <RBTable striped hover>
                <thead>
                <tr>
                    <th scope="col">Estación</th>
                    <th scope="col">Último Reporte</th>
                    <th scope="col">Batería</th>
                    <th scope="col">Panel</th>
                </tr>
                </thead>
                <tbody>
                {data.map(st => (
                    <tr key={st.name}>
                        <td>
                            <Link to={`/stations/${st.name}`}>{STATION_NAMES[st.name]}</Link>
                        </td>
                        <td>{lastReportTime(st.date)}</td>
                        <td>{roundVoltage(st.battery)}</td>
                        <td>{roundVoltage(st.panel)}</td>
                    </tr>
                ))}
                </tbody>
        </RBTable>
    )
};

export { Table };
