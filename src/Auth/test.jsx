import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";

import { Login } from "./Login.jsx";
import { actions, loginReducer } from "./loginReducer.js";
import { Register } from "./Register.jsx";
import { Confirm, Reconfirm } from "./Confirm.jsx";


vi.mock("axios");
// vi.mock("react-router-dom");

const rejectedPromise = (statusCode) => {
    return Promise.reject({
        response: {
            status: statusCode,
        }
    });
}

const waitForFormSubmission = async (promise) => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: {value: "triton@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
        target: {value: "6MonkeysRLooking^"}
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(async () => await promise);
}


describe("Login", () => {
    // it("Successful login redirects to stations page", async () => {
    //     const promise = Promise.resolve({
    //         data: {
    //             token: "FakeToken",
    //             expiration: 3600,
    //         }});
    //     axios.post.mockImplementationOnce(() => promise);
    //
    //     const routes = [
    //         {
    //             path: "/login",
    //             element: <AuthProvider><Login /></AuthProvider>,
    //         },
    //         {
    //             path: "/stations",
    //             element: <Stations />
    //         }
    //     ]
    //     const router = createMemoryRouter(routes, {
    //        initialEntries: ["/login"],
    //        initialIndex: 0,
    //     });
    //
    //     render(<RouterProvider router={router} />);
    //     expect(screen.queryAllByText(/Iniciar/)[0]).toBeInTheDocument();
    //
    //     await waitFor(async () =>  fireEvent.click(
    //         screen.queryByRole("button"))
    //     );
    //     await waitFor(async () => await promise);
    //     expect(screen.queryByText("Estaciones")).toBeInTheDocument();
    // });

    it("Invalid credentials display error", async () => {
        const promise = rejectedPromise(401);
        axios.post.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);

        try {
            await waitForFormSubmission(promise);
        } catch (error) {
            expect(screen.queryByText(/Usuario o contraseña inválidos/)).toBeInTheDocument();
        }
    });

    it("Unconfirmed user displays re-send confirmation link", async () => {
        const promise = rejectedPromise(400);
        axios.post.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);

        try {
            await waitForFormSubmission(promise);
        } catch (error) {
            expect(screen.queryByText(/no confirmado/)).toBeInTheDocument();
            expect(screen.queryByText(/reenviar email de confirmación/)).toBeInTheDocument();
        }
    });

});


describe("loginReducer", () => {
    it("Sets email", () => {
        const initialState = {
            email: "",
            password: "dog",
            isError: false,
            errorMsg: "",
        };
        const newState = loginReducer(initialState, {
            type: actions.setEmail,
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
            type: actions.setPassword,
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
            type: actions.successLogin
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
            type: actions.errorLogin,
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


describe("Register", () => {

    it("Email in use displays error message", async () => {
        const promise = rejectedPromise(400);
        axios.post.mockImplementationOnce(() => promise);

        render(<Register/>);
        try {
            await waitForFormSubmission(promise);
        } catch (error) {
            expect(screen.queryByText(/email en uso/)).toBeInTheDocument();
        }
    });

    it("Invalid email displays error message", async () => {
        const promise = rejectedPromise(401);
        axios.post.mockImplementationOnce(() => promise);

        render(<Register/>);
        try {
            await waitForFormSubmission(promise);
        } catch (error) {
            expect(screen.queryByText(/email inválido/)).toBeInTheDocument();
        }
    });

    it("Successful registration displays message", async () => {
        const promise = Promise.resolve();
        axios.post.mockImplementationOnce(() => promise);

        render(<Register/>);
        await waitForFormSubmission(promise);
        expect(screen.queryByText(/email de confirmación/)).toBeInTheDocument();
    })
});

describe("Reconfirm", () => {

    it("Successful reconfirmation displays message", async () => {
       const promise = Promise.resolve();
       axios.get.mockImplementationOnce(() => promise);
       useLocation.mockImplementationOnce(() => ({
           state: {
               email: "triton@example.com",
               password: "dog",
           }
       }));

       render(<BrowserRouter><Reconfirm /></BrowserRouter>);
       await waitFor(async () => await promise);

       expect(screen.queryByText(/enviado email de confirmación/)).toBeInTheDocument();
    });

    it("Unsuccessful reconfirmation displays error message", async () => {
        const promise = Promise.reject();
        axios.get.mockImplementationOnce(() => promise);
        useLocation.mockImplementationOnce(() => ({
            state: {
                email: "triton@example.com",
                password: "dog",
            }
        }));

        render(<BrowserRouter><Reconfirm /></BrowserRouter>);

        try {
            await waitFor(async () => await promise);
        } catch {
            expect(screen.queryByText(/Error al enviar email/)).toBeInTheDocument();
        }
    });

});


describe("Confirm", () => {

    it("Successful confirmation displays message", async () => {
        const promise = Promise.resolve({
            "confirmed": "account confirmed"
        });
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Confirm /></BrowserRouter>);
        await waitFor(async () => await promise);

        expect(screen.queryByText(/enviado email de confirmación/)).toBeInTheDocument();
    });

    it("Already confirmed user displays message", async () => {
        const promise = Promise.resolve({
            "confirmed": "user already confirmed"
        });
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Confirm /></BrowserRouter>);
        await waitFor(async () => await promise);

        expect(screen.queryByText(/email ya ha sido confirmado/)).toBeInTheDocument();
    });

    it("Invalid confirmation link", async () => {
        const promise = Promise.reject();
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Confirm /></BrowserRouter>);

        try {
            await waitFor(async () => await promise);
        } catch {
            expect(screen.queryByText(/Link invalido/)).toBeInTheDocument();
        }
    });
});
