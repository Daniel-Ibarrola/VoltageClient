
export const actions = {
    initFetch: 0,
    successFetch: 1,
    failFetch: 2,
    search: 3,
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
                    st => st.name.toLowerCase().includes(
                        state.searchTerm.replace(/\s/g, "").toLowerCase()
                    )
                )
            }
        case actions.failFetch:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case actions.search: {
            return {
                ...state,
                searchTerm: action.payload,
                display: state.data.filter(
                    st => st.name.toLowerCase().includes(
                        action.payload.replace(/\s/g, "").toLowerCase()
                    )
                )
            }
        }
        default:
            throw new Error();
    }
};
