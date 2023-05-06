import { Scatter } from "react-chartjs-2";
import {getReportDataForPlot} from "./plotData.js";


const ReportsChart = ({ reports }) => {

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    const data = getReportDataForPlot(reports);

    return(
        <div>
            <Scatter data={data} options={options}/>
        </div>
    );
};

export { ReportsChart };
