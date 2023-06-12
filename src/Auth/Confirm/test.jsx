import {describe, expect, it, vi} from "vitest";
import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import {useLocation, useParams} from "react-router-dom";
import {Confirm, Reconfirm} from "./Confirm.jsx";

vi.mock("axios");
vi.mock("react-router-dom");


describe("Reconfirm", () => {

    const getMocks = (promise) => {
        axios.get.mockImplementationOnce(() => promise);
        useLocation.mockImplementation(() => ({
            state: {
                email: "triton@example.com",
                password: "dog",
            }
        }));
    }

    it("Successful reconfirmation displays message", async () => {
        const promise = Promise.resolve();
        getMocks(promise);

        render(<Reconfirm />);
        await waitFor(async () => await promise);

        expect(screen.queryByText(/enviado un email de confirmación/)).toBeInTheDocument();
    });

    it("Unsuccessful reconfirmation displays error message", async () => {
        const promise = Promise.reject();
        getMocks(promise);

        render(<Reconfirm />);

        try {
            await waitFor(async () => await promise);
        } catch {
            expect(screen.queryByText(/Error al enviar email/)).toBeInTheDocument();
        }
    });

});

describe("Confirm", () => {

    const getMocks = (promise) => {
        axios.get.mockImplementationOnce(() => promise);
        useParams.mockImplementationOnce(() => ({
            token: "testToken"
        }));
    }

    it("Successful confirmation displays message", async () => {
        const promise = Promise.resolve({
            "confirmed": "account confirmed"
        });
        getMocks(promise);

        render(<Confirm />);
        await waitFor(async () => await promise);

        expect(screen.queryByText(/enviado email de confirmación/)).toBeInTheDocument();
    });

    it("Already confirmed user displays message", async () => {
        const promise = Promise.resolve({
            "confirmed": "user already confirmed"
        });
        getMocks(promise);

        render(<Confirm />);
        await waitFor(async () => await promise);

        expect(screen.queryByText(/email ya ha sido confirmado/)).toBeInTheDocument();
    });

    it("Invalid confirmation link", async () => {
        const promise = Promise.reject();
        getMocks(promise);

        render(<Confirm />);

        try {
            await waitFor(async () => await promise);
        } catch {
            expect(screen.queryByText(/Link invalido/)).toBeInTheDocument();
        }
    });
});