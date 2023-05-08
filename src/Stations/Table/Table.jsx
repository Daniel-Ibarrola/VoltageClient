import * as React from "react";
import RBTable from "react-bootstrap/Table"

import station_names from "../../shared/station_names.js";
import { lastReportTime, roundVoltage} from "./parse.js";
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
                    <tr key={st.name}>
                        <td>
                            <Link to={`/stations/${st.name}`}>{station_names[st.name]}</Link>
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
