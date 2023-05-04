import axios from "axios";
import { useParams } from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Station } from "./Station.jsx";

vi.mock("axios");
vi.mock("react-router-dom");

const voltages = [
    {
        "date": "2023-03-31T00:00:00",
        "battery": 100.50,
        "panel": 200.80,
    },
    {
        "date": "2023-03-31T12:00:00",
        "battery": 50.50,
        "panel": 150.80,
    }
]

const reports = [
    {
        date: "2023-03-31",
        reports: 2,
    }
]

describe("Station", () => {
    it("Displays error in case of invalid station parameter", () => {
        useParams.mockImplementationOnce(() => "EstacionDesconocida");
        render(<Station />);
        expect(screen.queryByText("Estación Invalida")).toBeInTheDocument();
    });

    it("Fails fetching data",  async () => {
       const promise = Promise.reject();
       axios.get.mockImplementationOnce(() => promise);
       expect(screen.queryByText(/Cargando/)).toBeInTheDocument();

        try {
            await waitFor(async () => await promise);
        } catch (error) {
            expect(screen.queryByText(/Cargando/)).toBeNull();
            expect(screen.queryByText(/No se pudo cargar/)).toBeInTheDocument();
        }
    });

    it("Fetch data and displays statistics", async () => {
        const promise = Promise.resolve({
           data: {
               reports: reports,
               voltages: voltages,
           }
        });

    });

});
