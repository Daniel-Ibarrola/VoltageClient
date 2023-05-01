
export const actions = {
    initFetch: "initFetch",
    successFetch: "successFetch",
    failFetch: "failFetch",
    setSearch: "setSearch",
    search: "search",
}


export const stationsReducer = (state, action) => {
    switch (action.type) {
        case actions.initFetch:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case actions.successFetch:
            return  {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
                display: action.payload.filter(
                    st => st.name.includes(state.searchTerm)
                )
            }
        case actions.failFetch:
            return {
                ...state,
                isLoading: false,
                isAxiosError: true,
            }
        case actions.setSearch:
            return {
                ...state,
                searchTerm: action.payload,
            }
        case actions.search:
            return {
                ...state,
                display: state.data.filter(
                    st => st.name.includes(state.searchTerm)
                )
            }
        default:
            throw new Error();
    }
};
