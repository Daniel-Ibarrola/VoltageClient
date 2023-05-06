
const getDateLabel = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    return `${month}/${day} ${hours}:${min}`;
} ;

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
};

export const getReportDataForPlot = (reports) => {
    // TODO: Add custom labels
    return {
        datasets: [
            {
                label: "Número de reportes",
                data: reports.map((item, index) => (
                    {x: index, y: item.reports})
                ),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    }
};
