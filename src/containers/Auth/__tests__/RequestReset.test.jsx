import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import {RequestReset} from "../RequestReset.jsx";
import {BrowserRouter} from "react-router-dom";
import { requestPasswordReset } from "../../../services/index.js";

vi.mock("../../../services/index.js", () => ({
    requestPasswordReset: vi.fn()
}));


describe("RequestReset", () => {
    const waitForFormSubmission = async (promise) => {
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: {value: "triton@example.com"}
        });
        fireEvent.click(screen.getByRole("button"));
        await waitFor(async () => await promise);
    };

    it("Successful reset displays alert", async () => {
        const promise = Promise.resolve(true);
        requestPasswordReset.mockImplementationOnce(() => promise);
        window.alert = vi.fn();

        render(<BrowserRouter><RequestReset /></BrowserRouter>);
        await waitForFormSubmission(promise);
        expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it("Unsuccessful reset displays message", async () => {
        const promise = Promise.resolve(false);
        requestPasswordReset.mockImplementationOnce(() => promise);
        render(<BrowserRouter><RequestReset /></BrowserRouter>);

        await waitForFormSubmission(promise);
        expect(
            screen.queryByText(/Error al solicitar/)
        ).toBeInTheDocument();
    });
});
