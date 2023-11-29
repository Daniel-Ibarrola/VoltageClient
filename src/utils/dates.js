

export const getDateWithDelta = (date, daysDelta) => {
    const newDate = new Date(
        date.getFullYear(), date.getMonth(), date.getDate() - daysDelta
    );

    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
};


export const lastReportTime = (date) => {
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


export const getDateLabel = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month} ${hours}:${min}`;
};


export const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


export const parseReportDate = (dateStr) => {
    const pieces = dateStr.split("-");
    const date = new Date();
    date.setFullYear(parseInt(pieces[0]));
    date.setMonth(parseInt(pieces[1]) - 1);
    date.setDate(parseInt(pieces[2]));
    return date;
};


export const getDateRange = (data) => {
    const dates = data.map(item => parseReportDate(item.date));
    const first = dates.reduce((a, b) => a < b ? a : b);
    const last = dates.reduce((a, b) => a > b ? a : b);

    return formatDate(first) + " - " + formatDate(last);
};


export const getLastDate = (data) => {
    const dates = data.map(item => new Date(item.date));
    const last = dates.reduce((a, b) => a > b ? a : b);
    const dateStr = last.toLocaleDateString("es-MX", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
};
