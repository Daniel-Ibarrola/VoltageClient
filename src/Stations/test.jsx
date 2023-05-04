import axios from "axios";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi} from "vitest";
import { actions, stationsReducer} from "./stationsReducer.js";
import { Stations } from "./Stations.jsx";

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

describe("stationsReducer", () => {
   it("initiating fetch sets loading state", () => {
      const action = { type: actions.initFetch };
      const state = {
          data: stations,
          display: stations,
          isLoading: false,
          isError: false,
          searchTerm: "",
      };

      const newState = stationsReducer(state, action);
      const expectedState = {
          data: stations,
          display: stations,
          isLoading: true,
          isError: false,
          searchTerm: "",
      }
      expect(newState).toStrictEqual(expectedState);
   });

   it("updates data on successful fetching", () => {
       const action = { type: actions.successFetch, payload: stations};
       const state = {
           data: [],
           display: [],
           isLoading: true,
           isError: false,
           searchTerm: "Caracol",
       }

       const newState = stationsReducer(state, action);
       const expectedState = {
           data: stations,  // Stations should be sorted
           display: [stationOne],
           isLoading: false,
           isError: false,
           searchTerm: "Caracol",
       }
       expect(newState).toStrictEqual(expectedState);
   });

    it("sets error state on fetch fail", () => {
        const action = { type: actions.failFetch };
        const state = {
            data: [],
            display: [],
            isLoading: true,
            isError: false,
            searchTerm: "",
        };

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: [],
            display: [],
            isLoading: false,
            isError: true,
            searchTerm: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("sets search term", () => {
        const action = { type: actions.setSearch, payload: "Caracol" };
        const state = {
            data: stations,
            display: stations,
            isLoading: false,
            isError: false,
            searchTerm: "",
        };

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: stations,
            display: stations,
            isLoading: false,
            isError: false,
            searchTerm: "Caracol",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("search updates displayed data", () => {
        const action = { type: actions.search };
        const state = {
            data: stations,
            display: [],
            isLoading: false,
            isError: false,
            searchTerm: "Caracol",
        };

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: stations,
            display: [stationOne],
            isLoading: false,
            isError: false,
            searchTerm: "Caracol",
        }
        expect(newState).toStrictEqual(expectedState);
    });
});


describe("Stations", () => {
    it("succeeds fetching data", async () => {
        const promise = Promise.resolve({
            data: stations,
        });
        axios.get.mockImplementationOnce(() => promise);

        render(<Stations />);

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

        render(<Stations />);
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

        render(<Stations />);

        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();
        await waitFor(async () => await promise);

        fireEvent.change(screen.getByRole("textbox"), {
            target: {value: "Caracol"},
        });
        fireEvent.submit(screen.queryByText("Buscar"));

        expect(screen.queryByText("Caracol")).toBeInTheDocument();
        expect(screen.queryByText("Tonalapa")).toBeNull();
        expect(screen.getAllByRole("row").length).toBe(2);
    })
})