import station_names from "../../shared/station_names.js";
import * as React from "react";
import { lastReportTime, roundVoltage} from "./parse.js";

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
                {data.map(st => (
                    <tr key={st.name}>
                        <td>{station_names[st.name]}</td>
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

export { Table };
