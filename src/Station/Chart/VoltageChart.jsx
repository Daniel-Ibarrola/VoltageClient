import {
    Chart as ChartJS,
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
import { getVoltageDataForPlot } from "./plotData.js";
import "./style.css"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const VoltageChart = ({ voltages }) => {
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

    // TODO: add date-range to title

    return (
        <>
            <Card className="chart-card">
                <Card.Title className="align-self-center">Voltajes</Card.Title>
                <Card.Subtitle className="align-self-center">31/03/2023 - 30/04/2023</Card.Subtitle>
                <Line
                    data={data}
                    options={options}
                    className="chart"
                />
            </Card>

        </>
    )
};

export { VoltageChart };
