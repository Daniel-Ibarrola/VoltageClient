import {describe, it, expect, vi} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import {UpdatePassword} from "../UpdatePassword.jsx";
import {updateUserPassword} from "../../../services/index.js";
import {BrowserRouter} from "react-router-dom";

vi.mock("../../../services/index.js", () => ({
    updateUserPassword: vi.fn()
}));


describe("Update Password", () => {

    const waitForFormSubmission = async (promise) => {
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
            target: {value: "6MonkeysRLooking^"}
        });
        fireEvent.change(screen.getByPlaceholderText("Nueva Contraseña"), {
            target: {value: "6ElephantsRLooking^"}
        });
        fireEvent.click(screen.getByRole("button"));
        await waitFor(async () => await promise);
    };

    it("Updates password successfully", async () => {
        const response = {
            token: "FakeToken",
            error: false,
            message: "",
        };
        const promise = Promise.resolve(response);
        updateUserPassword.mockImplementationOnce(() => promise);

        render(<BrowserRouter><UpdatePassword /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText("Se actualizó la contraseña")).toBeInTheDocument();
    });


    it("Incorrect original password and cannot update", async () => {
        const response = {
            token: "",
            error: true,
            message: "Contraseña inválida",
        };
        const promise = Promise.resolve(response);
        updateUserPassword.mockImplementationOnce(() => promise);

        render(<BrowserRouter><UpdatePassword /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText("Contraseña inválida")).toBeInTheDocument();
    });

});
