
export const STATIONS_ACTIONS = {
    INIT_FETCH: 0,
    SUCCESS_FETCH: 1,
    FAIL_FETCH: 2,
    SEARCH: 3,
}


export const stationsReducer = (state, action) => {
    switch (action.type) {
        case STATIONS_ACTIONS.INIT_FETCH:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case STATIONS_ACTIONS.SUCCESS_FETCH:
            return  {
                ...state,
                isLoading: false,
                error: "",
                data: action.payload,
                display: action.payload.filter(
                    st => st.station.toLowerCase().includes(
                        state.searchTerm.replace(/\s/g, "")
                            .toLowerCase()
                    )
                )
            };
        case STATIONS_ACTIONS.FAIL_FETCH:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case STATIONS_ACTIONS.SEARCH: {
            return {
                ...state,
                searchTerm: action.payload,
                display: state.data.filter(
                    st => st.station.toLowerCase().includes(
                        action.payload.replace(/\s/g, "").toLowerCase()
                    )
                )
            };
        }
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
};
