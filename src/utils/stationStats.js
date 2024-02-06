
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
