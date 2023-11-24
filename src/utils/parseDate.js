const lastReportTime = (date) => {
    if (date === null){
        return "-";
    }
    date = new Date(date);
    const delta = (Date.now() - date) / (1000 * 3600);

    if (delta <= 1) {return "Hace unos minutos";}
    if (delta < 6) {return "Hace menos de 6 hrs";}
    if (delta < 12) {return "Hace menos de 12 hrs";}
    if (delta < 24) {return "Hace menos de 24 hrs";}
    else {return "Hace más de 24 hrs";}
};

const roundVoltage = (voltage) => {
    if (voltage === null){
        return "-";
    }
    return voltage.toFixed(2);
};


export { lastReportTime, roundVoltage };
