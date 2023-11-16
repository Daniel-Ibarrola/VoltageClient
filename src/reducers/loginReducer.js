export const LOGIN_ACTIONS = {
    setEmail: 0,
    setPassword: 1,
    successLogin: 2,
    errorLogin: 3,
}

export const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ACTIONS.setEmail:
            return {
              ...state,
              email: action.payload
            };
        case LOGIN_ACTIONS.setPassword:
            return {
                ...state,
                password: action.payload,
            };
        case LOGIN_ACTIONS.successLogin:
            return {
                ...state,
                email: "",
                password: "",
                isError: false,
            };
        case LOGIN_ACTIONS.errorLogin:
            return {
                email: "",
                password: "",
                isError: true,
                errorMsg: action.payload,
            };
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
};
