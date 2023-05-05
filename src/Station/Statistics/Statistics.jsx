

const getDataMin = (data, type) => {
    return data.reduce(
            (prev, curr) =>
                (prev[type] < curr[type]) ? prev: curr
        , 0)[type];
};

const getDataMax = (data, type) => {
    return data.reduce(
        (prev, curr) =>
            (prev[type] > curr[type]) ? prev: curr
    , 0)[type];
};

const getLastDate = (data) => {
    const dates = data.map(item => new Date(item.date));
    const last = dates.reduce((a, b) => a > b ? a : b)
    return last.toLocaleDateString("es-MX", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
}

const Statistics = ({ data }) => {

    return (
            <div>
                {
                    data && (
                        <div>
                            <h2>Estadísticas de la estación</h2>
                            <p>
                                <strong>Último reporte: </strong>
                                {getLastDate(data)}
                            </p>
                            <div>
                                <h3>Voltages Batería</h3>
                                <p>Máximo: {getDataMax(data, "battery")}</p>
                                <p>Mínimo: {getDataMin(data, "battery")}</p>
                            </div>
                            <div>
                                <h3>Voltages Panel</h3>
                                <p>Máximo: {getDataMax(data, "panel")}</p>
                                <p>Mínimo: {getDataMin(data, "panel")}</p>
                            </div>
                            <p>Nota: valores de los úlimos 7 días</p>
                        </div>
                    )
                }
            </div>
    )
};

export { Statistics, getDataMin, getDataMax, getLastDate };
