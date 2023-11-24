export const LOGIN_ACTIONS = {
    SET_EMAIL: 0,
    SET_PASSWORD: 1,
    UPDATE_PASSWORD: 2,
    SUCCESS: 3,
    ERROR: 4,
}

export const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ACTIONS.SET_EMAIL:
            return {
              ...state,
              email: action.payload
            };
        case LOGIN_ACTIONS.SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case LOGIN_ACTIONS.UPDATE_PASSWORD:
            return {
                ...state,
                session: action.payload
            }
        case LOGIN_ACTIONS.SUCCESS:
            return {
                ...state,
                email: "",
                password: "",
                errorMsg: "",
            };
        case LOGIN_ACTIONS.ERROR:
            return {
                ...state,
                email: "",
                password: "",
                errorMsg: action.payload,
            };
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
};
