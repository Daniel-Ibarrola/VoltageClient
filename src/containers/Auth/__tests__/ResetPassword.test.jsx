import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { ResetPassword } from "../ResetPassword.jsx";
import { resetUserPassword } from "../../../services/index.js";


vi.mock("../../../services/index.js", () => ({
    resetUserPassword: vi.fn()
}));


describe("ResetPassword", () => {
    const waitForFormSubmission = async (promise) => {
        fireEvent.change(screen.getByPlaceholderText("Correo"), {
            target: {value: "triton@example.com"}
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
            target: {value: "6MonkeysRLooking^"}
        });
        fireEvent.change(screen.getByPlaceholderText("Código de confirmación"), {
            target: {value: "12345"}
        });
        fireEvent.click(screen.getByRole("button"));
        await waitFor(async () => await promise);
    };

    it("Successful reset displays alert", async () => {
        const promise  = Promise.resolve(true);
        resetUserPassword.mockImplementationOnce(() => promise);

        render(<BrowserRouter><ResetPassword /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText(/reseteado la contraseña/)).toBeInTheDocument();
    });

    it("Unsuccessful reset displays message", async () => {
        const promise  = Promise.resolve(false);
        resetUserPassword.mockImplementationOnce(() => promise);

        render(<BrowserRouter><ResetPassword /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText(/Error al resetear/)).toBeInTheDocument();
    });
});
