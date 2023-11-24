
export const STATION_ACTION = {
    initFetch: "INIT_FETCH",
    successFetchStations: "SUCCESS_STATIONS",
    successFetchReportCount: "SUCCESS_REPORT_COUNT",
    failFetch: "FAIL_FETCH",
};

export const stationDataReducer = (state, action) => {
    switch (action.type) {
        case STATION_ACTION.initFetch:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case STATION_ACTION.successFetchReportCount:
            return {
                ...state,
                isLoading: false,
                isError: false,
                reports: action.payload,
            }
        case STATION_ACTION.successFetchStations:
            return {
                ...state,
                isLoading: false,
                isError: false,
                voltages: action.payload,
            }
        case STATION_ACTION.failFetch:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
};