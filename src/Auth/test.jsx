import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { RouterProvider, createMemoryRouter, BrowserRouter } from "react-router-dom";
import { Login } from "./Login.jsx";
import { Stations } from "../Stations/index.js";


vi.mock("axios");

describe("Login", () => {
    it("Successful login redirects to stations page", async () => {
        const promise = Promise.resolve({
            data: {
                token: "FakeToken",
                expiration: 3600,
            }});
        axios.get.mockImplementationOnce(() => promise);

        const routes = [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/stations",
                element: <Stations />
            }
        ]
        const router = createMemoryRouter(routes, {
           initialEntries: ["/"],
           initialIndex: 1,
        });

        render(<RouterProvider router={router} />);
        expect(screen.queryByText("Iniciar sesion")).toBeInTheDocument();

        fireEvent.click(screen.queryByRole("button"));
        await waitFor(async () => await promise);

        expect(screen.queryByText("Estaciones")).toBeInTheDocument();
    });

    it("Invalid credential displays error", async () => {
        const promise = Promise.reject();
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);

        fireEvent.click(screen.queryByRole("button"));
        await waitFor(async () => await promise);

        expect(screen.queryByText(/Error al iniciar sesión/)).toBeInTheDocument();
    });

});
