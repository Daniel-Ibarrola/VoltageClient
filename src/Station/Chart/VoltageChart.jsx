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
import { getVoltageDataForPlot } from "./plotData.js";


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
                position: 'top',
            },
            title: {
                display: true,
                text: 'Voltajes',
            },
        },
    };

    return (
        <div>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
};

export { VoltageChart };
