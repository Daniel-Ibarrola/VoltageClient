import { getDateLabel, parseReportDate} from "./dates.js";

export const getVoltageDataForPlot = (voltages) => {
    const labels = voltages
        .map(item => new Date(item.date))
        .map(date => getDateLabel(date));

    return {
        labels,
        datasets: [
            {
                label: "Batería",
                data: voltages.map(item => item.battery),
                borderColor: 'rgb(203, 67, 53)',
                backgroundColor: 'rgba(203, 67, 53, 0.5)',
            },
            {
                label: "Panel",
                data: voltages.map(item => item.panel),
                borderColor: 'rgb(36, 113, 163)',
                backgroundColor: 'rgba(36, 113, 163, 0.5)',
            }
        ]
    };
};


export const getReportDataForPlot = (reports) => {
    const labels = reports
        .map(item => parseReportDate(item.date))
        .map(date => {
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${day}/${month}`;
        });
    return {
        labels,
        datasets: [
            {
                fill: true,
                label: "Número de reportes",
                data: reports.map((item) => (item.count)),
                borderColor: 'rgb(40, 180, 99)',
                backgroundColor: 'rgba(40, 180, 99, 0.2)',
                stepped: "after",
            }
        ]
    }
};
