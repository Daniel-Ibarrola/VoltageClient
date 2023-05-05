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

    const labels = voltages
        .map(item => new Date(item.date))
        .map(date => date.toLocaleDateString({
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric",
        }));

    const data = {
        labels,
        datasets: [
            {
                label: "Bateria",
                data: voltages.map(item => item.battery),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: "Panel",
                data: voltages.map(item => item.panel),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    };

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
