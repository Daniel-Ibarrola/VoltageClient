import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import { RouterProvider, createMemoryRouter, BrowserRouter } from "react-router-dom";
//
// import { AuthProvider } from "./AuthProvider.jsx";
// import { Login } from "./Login.jsx";
// import { Stations } from "../Stations/index.js";
import { actions, loginReducer } from "./loginReducer.js";
import { Register } from "./Register.jsx";


vi.mock("axios");

// describe("Login", () => {
//     // it("Successful login redirects to stations page", async () => {
//     //     const promise = Promise.resolve({
//     //         data: {
//     //             token: "FakeToken",
//     //             expiration: 3600,
//     //         }});
//     //     axios.post.mockImplementationOnce(() => promise);
//     //
//     //     const routes = [
//     //         {
//     //             path: "/login",
//     //             element: <AuthProvider><Login /></AuthProvider>,
//     //         },
//     //         {
//     //             path: "/stations",
//     //             element: <Stations />
//     //         }
//     //     ]
//     //     const router = createMemoryRouter(routes, {
//     //        initialEntries: ["/login"],
//     //        initialIndex: 0,
//     //     });
//     //
//     //     render(<RouterProvider router={router} />);
//     //     expect(screen.queryAllByText(/Iniciar/)[0]).toBeInTheDocument();
//     //
//     //     await waitFor(async () =>  fireEvent.click(
//     //         screen.queryByRole("button"))
//     //     );
//     //     await waitFor(async () => await promise);
//     //     expect(screen.queryByText("Estaciones")).toBeInTheDocument();
//     // });
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
//         try {
//             await waitFor(async () => await promise);
//         } catch (error) {
//             expect(screen.queryByText(/Error al iniciar/)).toBeInTheDocument();
//         }
//
//     });
//
// });


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
            expect(screen.queryByText(/email invalido/)).toBeInTheDocument();
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
