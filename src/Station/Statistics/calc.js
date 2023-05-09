export const getDataMin = (data, type) => {
    return data.reduce(
        (prev, curr) =>
            (prev[type] < curr[type]) ? prev: curr
        , 0)[type];
};

export const getDataMax = (data, type) => {
    return data.reduce(
        (prev, curr) =>
            (prev[type] > curr[type]) ? prev: curr
        , 0)[type];
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
