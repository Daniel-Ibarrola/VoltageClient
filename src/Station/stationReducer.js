
export const actions = {
    initFetch: "INIT_FETCH",
    successFetchStations: "SUCCESS_STATIONS",
    successFetchReportCount: "SUCCESS_REPORT_COUNT",
    failFetch: "FAIL_FETCH",
};

export const stationDataReducer = (state, action) => {
    switch (action.type) {
        case actions.initFetch:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case actions.successFetchReportCount:
            // action.payload.sort((a, b) => a.name > b.name);
            return {
                ...state,
                isLoading: false,
                isError: false,
                reports: action.payload,
            }
        case actions.successFetchStations:
            // action.payload.sort((a, b) => a.name > b.name);
            return {
                ...state,
                isLoading: false,
                isError: false,
                voltages: action.payload,
            }
        case actions.failFetch:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};