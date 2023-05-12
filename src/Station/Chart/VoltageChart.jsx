import {
    Chart as ChartJS,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from "react-bootstrap/Card";

import { getVoltageDataForPlot, getDateRange } from "./plotData.js";
import { Dropdown } from "../Dropdown/index.js";
import "./style.css"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const VoltageChart = ({ voltages, onDropDownItemClick }) => {
    const data = getVoltageDataForPlot(voltages);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    };
    return (
        <>
            <Card className="chart-card">
                <Card.Title className="align-self-center">Voltajes</Card.Title>
                <Card.Subtitle className="align-self-center">{getDateRange(voltages)}</Card.Subtitle>
                <Line
                    data={data}
                    options={options}
                    className="chart"
                />
                <Card.Body>
                    <Dropdown onItemClick={onDropDownItemClick}/>
                </Card.Body>
            </Card>

        </>
    )
};

export { VoltageChart };
