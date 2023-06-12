import {describe, expect, it, vi} from "vitest";
import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter, useLocation} from "react-router-dom";
import {Confirm, Reconfirm} from "./Confirm.jsx";

vi.mock("axios");
vi.mock("react-router-dom");


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