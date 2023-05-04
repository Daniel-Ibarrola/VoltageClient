
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
            // action.payload.sort((a, b) => a.name > b.name);
            return  {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
                display: action.payload.filter(
                    st => st.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                )
            }
        case actions.failFetch:
            return {
                ...state,
                isLoading: false,
                isError: true,
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
                    st => st.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                )
            }
        default:
            throw new Error();
    }
};
