export const actions = {
    setEmail: 0,
    setPassword: 1,
    successLogin: 2,
    errorLogin: 3,
}

export const loginReducer = (state, action) => {
    switch (action.type) {
        case actions.setEmail:
            return {
              ...state,
              email: action.payload
            };
        case actions.setPassword:
            return {
                ...state,
                password: action.payload,
            };
        case actions.successLogin:
            return {
                email: "",
                password: "",
                isError: false,
            };
        case actions.errorLogin:
            return {
                email: "",
                password: "",
                isError: true,
            };
        default:
            throw new Error();
    }
};
