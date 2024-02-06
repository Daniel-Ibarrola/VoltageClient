import RBTable from "react-bootstrap/Table"

import { lastReportTime, roundVoltage} from "../../utils/index.js";
import { Link } from "react-router-dom";

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
                    <tr key={st.station}>
                        <td>
                            <Link to={`/stations/${st.station}`}>
                                {st.station}
                            </Link>
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
