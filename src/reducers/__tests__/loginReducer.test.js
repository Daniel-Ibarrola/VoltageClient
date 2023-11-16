import {describe, expect, it} from "vitest";
import {LOGIN_ACTIONS, loginReducer} from "../loginReducer.js";


describe("loginReducer", () => {
    it("Sets email", () => {
        const initialState = {
            email: "",
            password: "dog",
            isError: false,
            errorMsg: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.setEmail,
            payload: "triton@example.com"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
            errorMsg: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Sets password", () => {
        const initialState = {
            email: "triton@example.com",
            password: "",
            isError: false,
            errorMsg: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.setPassword,
            payload: "dog"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
            errorMsg: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Login success", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
            errorMsg: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.successLogin
        });

        const expectedState = {
            email: "",
            password: "",
            isError: false,
            errorMsg: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Login fail", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
            errorMsg: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.errorLogin,
            payload: "Usuario o contraseña invalidos"
        });

        const expectedState = {
            email: "",
            password: "",
            isError: true,
            errorMsg: "Usuario o contraseña invalidos",
        };
        expect(newState).toStrictEqual(expectedState);
    });
});
