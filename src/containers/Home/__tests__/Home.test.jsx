import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi} from "vitest";
import { Home } from "../Home.jsx";

vi.mock("axios");

const stationOne = {
    name: "Caracol",
    date:  "2023-03-31T00:00:00",
    battery: 300.12,
    panel: 100.50,
};

const stationTwo = {
    name: "Tonalapa",
    date:  "2023-03-31T00:00:00",
    battery: 150.24,
    panel: 200.15,
};


const stations = [stationOne, stationTwo]


describe("Home", () => {
    it("succeeds fetching data", async () => {
        const promise = Promise.resolve({
            data: stations,
        });
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Home fetchTime={3600 * 1000}/></BrowserRouter>);

        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();
        await waitFor(async () => await promise);

        expect(screen.queryByText(/Cargando/)).toBeNull();
        expect(screen.getAllByRole("row").length).toBe(3);
        expect(screen.queryByText("Caracol")).toBeInTheDocument();
        expect(screen.queryByText("Tonalapa")).toBeInTheDocument();
    });

    it("fails fetching data", async () => {
        const promise = Promise.reject();
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Home fetchTime={3600 * 1000}/></BrowserRouter>);
        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();

        try {
            await waitFor(async () => await promise);
        } catch (error) {
            expect(screen.queryByText(/Cargando/)).toBeNull();
            expect(screen.queryByText(/No se pudo cargar/)).toBeInTheDocument();
        }
    });

    it("searches for a specific station", async () => {
        const promise = Promise.resolve({
            data: stations,
        });
        axios.get.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Home fetchTime={3600 * 1000}/></BrowserRouter>);

        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();
        await waitFor(async () => await promise);

        fireEvent.change(screen.getByRole("textbox"), {
            target: {value: "Caracol"},
        });

        expect(screen.queryByText("Caracol")).toBeInTheDocument();
        expect(screen.queryByText("Tonalapa")).toBeNull();
        expect(screen.getAllByRole("row").length).toBe(2);
    });

    it("Fetches data again after time passes", async () => {
        const initialPromise = Promise.resolve({
            data: stations,
        });
        const finalPromise = Promise.resolve({
            data: [
                    {
                        name: "Caracol",
                        date:  "2023-03-31T00:00:00",
                        battery: 500.0,
                        panel: 400.0,
                    },
                    {
                        name: "Tonalapa",
                        date:  "2023-03-31T00:00:00",
                        battery: 400.0,
                        panel: 600.0,
                    },
            ]
        });
        axios.get
            .mockImplementationOnce(() => initialPromise)
            .mockImplementationOnce(() => finalPromise);

        render(<BrowserRouter><Home fetchTime={3000}/></BrowserRouter>);

        await waitFor(async () => initialPromise);
        expect(screen.getAllByRole("row").length).toBe(3);
        expect(screen.queryByText(/300.1/)).toBeInTheDocument();
        expect(screen.queryByText(/150.2/)).toBeInTheDocument();

        const waitPromise =  new Promise(resolve => setTimeout(resolve, 3000))
        await waitFor(async () => waitPromise, {
            timeout: 4000,
        });
        await waitFor(async () => finalPromise);
        expect(screen.getAllByRole("row").length).toBe(3);
        expect(screen.queryByText(/500.0/)).toBeInTheDocument();
        expect(screen.queryByText(/600.0/)).toBeInTheDocument();
    });
});
