import { Scatter } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

import {getReportDataForPlot} from "./plotData.js";
import "./style.css"

const ReportsChart = ({ reports }) => {
    // TODO: Add title
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                position: "bottom",
            }
        }
    };
    const data = getReportDataForPlot(reports);

    return(
        <>
            <Card className="chart-card">
                <Card.Title className="align-self-center">Reportes</Card.Title>
                <Card.Subtitle className="align-self-center">31/03/2023 - 30/04/2023</Card.Subtitle>
                <Scatter
                    data={data}
                    options={options}
                    className="chart"
                />
            </Card>
        </>
    );
};

export { ReportsChart };
