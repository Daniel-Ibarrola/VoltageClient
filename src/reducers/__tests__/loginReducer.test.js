import {describe, expect, it} from "vitest";
import {LOGIN_ACTIONS, loginReducer} from "../loginReducer.js";


describe("loginReducer", () => {

    it("Sets email", () => {
        const initialState = {
            email: "",
            password: "dog",
            errorMsg: "",
            session: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.SET_EMAIL,
            payload: "triton@example.com"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            errorMsg: "",
            session: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Sets password", () => {
        const initialState = {
            email: "triton@example.com",
            password: "",
            errorMsg: "",
            session: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.SET_PASSWORD,
            payload: "dog"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            errorMsg: "",
            session: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Login success", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            errorMsg: "",
            session: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.SUCCESS
        });

        const expectedState = {
            email: "",
            password: "",
            errorMsg: "",
            session: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Login fail", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            errorMsg: "",
            session: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.ERROR,
            payload: "LoginError"
        });

        const expectedState = {
            email: "",
            password: "",
            errorMsg: "LoginError",
            session: "",
        };
        expect(newState).toStrictEqual(expectedState);
    });

    it("User needs to update password", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            errorMsg: "",
            session: "",
        };
        const newState = loginReducer(initialState, {
            type: LOGIN_ACTIONS.UPDATE_PASSWORD,
            payload: "FakeSession"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            errorMsg: "",
            session: "FakeSession",
        };
        expect(newState).toStrictEqual(expectedState);
    });
});
