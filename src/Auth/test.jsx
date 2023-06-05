import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { RouterProvider, createMemoryRouter, BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./AuthProvider.jsx";
import { Login } from "./Login.jsx";
import { Stations } from "../Stations/index.js";
import { actions, loginReducer } from "./loginReducer.js";


vi.mock("axios");

// describe("Login", () => {
//     it("Successful login redirects to stations page", async () => {
//         const promise = Promise.resolve({
//             data: {
//                 token: "FakeToken",
//                 expiration: 3600,
//             }});
//         axios.post.mockImplementationOnce(() => promise);
//
//         const routes = [
//             {
//                 path: "/login",
//                 element: <AuthProvider><Login /></AuthProvider>,
//             },
//             {
//                 path: "/stations",
//                 element: <Stations />
//             }
//         ]
//         const router = createMemoryRouter(routes, {
//            initialEntries: ["/login"],
//            initialIndex: 0,
//         });
//
//         render(<RouterProvider router={router} />);
//         expect(screen.queryAllByText(/Iniciar/)[0]).toBeInTheDocument();
//
//         await waitFor(async () =>  fireEvent.click(
//             screen.queryByRole("button"))
//         );
//         await waitFor(async () => await promise);
//         expect(screen.queryByText("Estaciones")).toBeInTheDocument();
//     });
//
//     it("Invalid credentials display error", async () => {
//         const promise = Promise.reject();
//         axios.post.mockImplementationOnce(() => promise);
//
//         render(<BrowserRouter>
//             <AuthProvider><Login /></AuthProvider>
//         </BrowserRouter>);
//
//
//         await waitFor(async () =>  fireEvent.click(
//             screen.queryByRole("button"))
//         );
//         await waitFor(async () => await promise);
//
//         expect(screen.queryByText(/Error al iniciar/)).toBeInTheDocument();
//     });
//
// });


describe("loginReducer", () => {
    it("Sets email", () => {
        const initialState = {
            email: "",
            password: "dog",
            isError: false,
        };
        const newState = loginReducer(initialState, {
            type: actions.setEmail,
            payload: "triton@example.com"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Sets password", () => {
        const initialState = {
            email: "triton@example.com",
            password: "",
            isError: false,
        };
        const newState = loginReducer(initialState, {
            type: actions.setPassword,
            payload: "dog"
        });

        const expectedState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Login success", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
        };
        const newState = loginReducer(initialState, {
            type: actions.successLogin
        });

        const expectedState = {
            email: "",
            password: "",
            isError: false,
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("Login fail", () => {
        const initialState = {
            email: "triton@example.com",
            password: "dog",
            isError: false,
        };
        const newState = loginReducer(initialState, {
            type: actions.errorLogin
        });

        const expectedState = {
            email: "",
            password: "",
            isError: true,
        }
        expect(newState).toStrictEqual(expectedState);
    });
});
