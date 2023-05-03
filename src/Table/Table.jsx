import stations from "../shared/stations.js";
import * as React from "react";

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
                {data.map(st => (
                    <tr key={st.name}>
                        <td>{stations[st.name]}</td>
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

export { Table, lastReportTime, roundVoltage };
