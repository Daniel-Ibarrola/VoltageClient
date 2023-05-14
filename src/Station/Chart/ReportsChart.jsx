import { Line } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

import {getReportDataForPlot, getDateRange} from "./plotData.js";
import { Dropdown } from "../Dropdown/index.js";
import "./style.css"

const ReportsChart = ({ reports, onDropDownItemClick }) => {
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
                <Card.Subtitle className="align-self-center">{getDateRange(reports)}</Card.Subtitle>
                <Line
                    data={data}
                    options={options}
                    className="chart"
                />
                <Card.Body>
                    <Dropdown
                        onItemClick={onDropDownItemClick}
                        type="reports"
                    />
                </Card.Body>
            </Card>
        </>
    );
};

export { ReportsChart };
