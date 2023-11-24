import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../../../context/AuthProvider.jsx";
import { Login } from "../Login.jsx";
import { logInUser } from "../../../services/index.js";


vi.mock("../../../services/index.js", () => ({
    logInUser: vi.fn()
}));


describe("Login", () => {

    const waitForFormSubmission = async (promise) => {
        fireEvent.change(screen.getByPlaceholderText("Correo"), {
            target: {value: "triton@example.com"}
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
            target: {value: "6MonkeysRLooking^"}
        });
        fireEvent.click(screen.getAllByRole("button")[0]);
        await waitFor(async () => await promise);
    };

    it("Successful login", async () => {
        const loginResponse = {
            token: "FakeToken",
            error: false,
            message: "",
            session: "",
        };
        const promise = Promise.resolve(loginResponse);
        logInUser.mockImplementationOnce(() => promise);

        render(<BrowserRouter><AuthProvider><Login /></AuthProvider></BrowserRouter>);
        await waitForFormSubmission(promise);

        const token = JSON.parse(localStorage.getItem("token"));
        expect(token).toBe("FakeToken");
    });

    it("Invalid credentials display error", async () => {
        const loginResponse = {
            token: "",
            error: true,
            message: "Usuario o contraseña inválidos",
            session: ""
        }
        const promise = Promise.resolve(loginResponse);
        logInUser.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText(/Usuario o contraseña inválidos/)).toBeInTheDocument();
    });

    it("New user needs to update password", async () => {
        const loginResponse = {
            token: "",
            error: false,
            message: "",
            session: "FakeSession"
        }
        const promise = Promise.resolve(loginResponse);
        logInUser.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText(/actualizar la contraseña/)).toBeInTheDocument();
    });

});
