export const identifyStations = (reports) => {
    const stations = []
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
    for (let ii = 0; ii < reports.length; ii++){
        let date = new Date(reports[ii].date);
        let delta = (Date.now() - date) / (1000 * 3600);
        if (delta >= 24){
            stations.push({
                station: reports[ii].station,
                date: new Date(Date.now()).toLocaleDateString("es-MX", dateOptions),
                body: `${reports[ii].station} no se ha reportado desde ${date.toLocaleDateString("es-MX", dateOptions)}`
            });
        }
        else if (reports[ii].battery < 10 || reports[ii].panel < 10){
            stations.push({
                station: reports[ii].station,
                date: new Date(Date.now()).toLocaleDateString("es-MX", dateOptions),
                body: `${reports[ii].station}: voltaje por debajo de 10 volts`
            });
        }
    }
    return stations;
};