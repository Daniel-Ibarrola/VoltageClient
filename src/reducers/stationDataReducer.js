
export const STATION_ACTION = {
    INIT_FETCH: 0,
    SUCCESS_FETCH_REPORTS: 1,
    SUCCESS_FETCH_COUNT: 2,
    FAIL_FETCH: 3,
};

export const stationDataReducer = (state, action) => {
    switch (action.type) {
        case STATION_ACTION.INIT_FETCH:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case STATION_ACTION.SUCCESS_FETCH_COUNT:
            return {
                ...state,
                isLoading: false,
                isError: false,
                reports: action.payload,
            }
        case STATION_ACTION.SUCCESS_FETCH_REPORTS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                voltages: action.payload,
            }
        case STATION_ACTION.FAIL_FETCH:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
};