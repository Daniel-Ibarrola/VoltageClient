import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi} from "vitest";
import { Home } from "../Home.jsx";
import { getLastReports } from "../../../services/index.js";

vi.mock("../../../services/index.js", () => ({
    getLastReports: vi.fn()
}));


describe("Home", () => {

    const stationOne = {
        station: "Caracol",
        date:  "2023-03-31T00:00:00",
        battery: 300.12,
        panel: 100.50,
    };

    const stationTwo = {
        station: "Tonalapa",
        date:  "2023-03-31T00:00:00",
        battery: 150.24,
        panel: 200.15,
    };


    const stations = [stationOne, stationTwo]

    it("succeeds fetching data", async () => {
        const promise = Promise.resolve({
            data: stations,
            error: "",
        });
        getLastReports.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Home fetchTime={3600 * 1000}/></BrowserRouter>);

        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();
        await waitFor(async () => await promise);

        expect(screen.queryByText(/Cargando/)).toBeNull();
        expect(screen.getAllByRole("row").length).toBe(3);
        expect(screen.queryByText("Caracol")).toBeInTheDocument();
        expect(screen.queryByText("Tonalapa")).toBeInTheDocument();
    });

    it("fails fetching data", async () => {
        const promise = Promise.resolve({
            data: [],
            error: "No se pudo cargar los últimos datos"
        });
        getLastReports.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Home fetchTime={3600 * 1000}/></BrowserRouter>);
        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();

        await waitFor(async () => await promise);
        expect(screen.queryByText(/Cargando/)).toBeNull();
        expect(screen.queryByText(/No se pudo cargar/)).toBeInTheDocument();
    });

    it("searches for a specific station", async () => {
        const promise = Promise.resolve({
            data: stations,
            error: ""
        });
        getLastReports.mockImplementationOnce(() => promise);

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
            error: ""
        });
        const finalPromise = Promise.resolve({
            data: [
                    {
                        station: "Caracol",
                        date:  "2023-03-31T00:00:00",
                        battery: 500.0,
                        panel: 400.0,
                    },
                    {
                        station: "Tonalapa",
                        date:  "2023-03-31T00:00:00",
                        battery: 400.0,
                        panel: 600.0,
                    },
            ],
            error: ""
        });
        getLastReports
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
