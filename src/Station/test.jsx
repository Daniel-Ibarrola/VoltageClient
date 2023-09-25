import axios from "axios";
import { useParams } from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Station } from "./Station.jsx";
import { actions, stationDataReducer } from "./stationReducer.js";
import { getDateWithDelta } from "./getDate.js";

vi.mock("axios");
vi.mock("react-router-dom");

const voltages = [
    {
        "date": "2023-03-30T12:00:00",
        "battery": 205.00,
        "panel": 100.80,
    },
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
        date: "2023-03-30",
        reports: 1,
    },
    {
        date: "2023-03-31",
        reports: 2,
    },
]

describe("Station", () => {
    it("Displays error in case of invalid station parameter", () => {
        useParams.mockImplementation(() => ({
            stationName: "EstacionDesconocida",
        }));
        render(<Station />);
        expect(screen.queryByText(/Invalida/)).toBeInTheDocument();
    });

    it("Fails fetching data",  async () => {
       const promise = Promise.reject();
       axios.get.mockImplementation(() => promise);
       useParams.mockImplementation(() => ({
           stationName: "Tonalapa",
       }));

       render(<Station />);
       expect(screen.queryByText(/Cargando/)).toBeInTheDocument();

       try {
            await waitFor(async () => await promise);
       } catch (error) {
            expect(screen.queryByText(/Cargando/)).toBeNull();
            expect(screen.queryByText(/No se pudo cargar/)).toBeInTheDocument();
       }
    });

    const prepareChartTest = () => {
        // Must mock resize and intersection observer for charts to work
        window.ResizeObserver = function () {
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
            };
        };
        window.IntersectionObserver =  function() {
            return {
                observe: vi.fn(),
                disconnect: vi.fn(),
            };
        };
    };

    it("Fetches data and displays statistics and charts", async () => {
        prepareChartTest();
        const voltagePromise = Promise.resolve({data: voltages});
        const reportsPromise = Promise.resolve({data: reports})

        axios.get.mockImplementation((url) => {
            if (url.includes("counts"))
                return reportsPromise;
            if (url.includes("reports"))
                return voltagePromise;
            throw Error();
        });
        useParams.mockImplementation(() => ({
            stationName: "Tonalapa",
        }));

        render(<Station />);
        expect(screen.queryByText(/Cargando/)).toBeInTheDocument();
        await waitFor(async () => await voltagePromise);
        await waitFor(async () => await reportsPromise);

        // After fetching the data the statistics part should render
        // using the data just fetched.

        // The date of the last report should appear
        expect(screen.queryByText(/31 de marzo/)).toBeInTheDocument();
        // The maximum and minimum voltages of the battery
        expect(screen.queryByText(/205/)).toBeInTheDocument();
        expect(screen.queryByText(/50.5/)).toBeInTheDocument();
        // The maximum and minimum voltages of the panel
        expect(screen.queryByText(/200.8/)).toBeInTheDocument();
        expect(screen.queryByText(/100.8/)).toBeInTheDocument();
        // The status of the sensor should be to review because the last
        // report date was more than a day ago
        // expect(screen.queryByText(/Revisar/)).toBeInTheDocument()

        // Two charts should be rendered. One for the voltages and the
        // other for the reports
        expect(screen.queryAllByRole("img").length).toBe(2);
    });

    it("Fetches data after selecting date range from dropdown", async () => {
        prepareChartTest();
        const voltagePromise = Promise.resolve({data: voltages});
        const reportsPromise = Promise.resolve({data: reports});
        const voltagePromise2 = Promise.resolve({data: [
                {
                    "date": "2023-05-04T00:00:00",
                    "battery": 100.50,
                    "panel": 200.80,
                },
                {
                    "date": "2023-05-05T12:00:00",
                    "battery": 50.50,
                    "panel": 150.80,
                }
            ]})

        axios.get
            .mockImplementationOnce(() => voltagePromise)
            .mockImplementationOnce(() => reportsPromise)
            .mockImplementationOnce(() => voltagePromise2);

        render(<Station />);
        await waitFor(async () => await voltagePromise);
        await waitFor(async () => await reportsPromise);

        // Clicking on the dropdown displays items.
        // The first dropdown will correspond to the voltages
        await waitFor(async () => fireEvent.click(
            screen.getAllByRole("button")[0])
        );
        // After selecting an item from the dropdown voltage date is fetched again
        await waitFor(async () => fireEvent.click(
            screen.getByText("Último mes"))
        );
        // The date of the last report should be updated
        expect(screen.queryByText(/31 de marzo/)).toBeNull();
        expect(screen.queryByText(/5 de mayo/)).toBeInTheDocument();
    });
});


describe("stationDataReducer", () => {
    it("initiating fetch sets loading state", () => {
        const action = { type: actions.initFetch };
        const state = {
            voltages: [],
            reports: [],
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        };

        const newState = stationDataReducer(state, action);
        const expectedState = {
            voltages: [],
            reports: [],
            isLoading: true,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("updates voltage data on successful fetching", () => {
        const action = {
            type: actions.successFetchStations,
            payload: voltages
        };
        const state = {
            voltages: [],
            reports: [],
            isLoading: true,
            isError: false,
            name: "Tonalapa"
        }

        const newState = stationDataReducer(state, action);
        const expectedState = {
            voltages: voltages,  // Stations should be sorted
            reports: [],
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("updates report count data on successful fetching", () => {
        const action = {
            type: actions.successFetchReportCount,
            payload: reports
        };
        const state = {
            voltages: [],
            reports: [],
            isLoading: true,
            isError: false,
            name: "Tonalapa"
        }

        const newState = stationDataReducer(state, action);
        const expectedState = {
            voltages: [],  // Stations should be sorted
            reports: reports,
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("sets error state on fetch fail", () => {
        const action = { type: actions.failFetch };
        const state = {
            voltages: [],
            reports: [],
            isLoading: true,
            isError: false,
            name: "Tonalapa"
        };

        const newState = stationDataReducer(state, action);
        const expectedState = {
            voltages: [],
            reports: [],
            isLoading: false,
            isError: true,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });
});

describe("getDateWithDelta", () => {
    it("Computes date from a week ago correctly", () => {
        // In date class month 4 corresponds to May (0 indexed)
        const date = new Date(2023, 4, 5);
        const daysDelta = 7;

        const aWeekAgo = getDateWithDelta(date, daysDelta);
        // We expect the month to be April (04)
        const expected = "2023-04-28";
        expect(aWeekAgo).toBe(expected);
    });

    it("Computes date from a month ago correctly", () => {
        // In date class month 4 corresponds to May (0 indexed)
        const date = new Date(2023, 4, 12);
        const delta= 30;

        const aMonthAgo = getDateWithDelta(date, delta);
        // We expect the month to be April (04)
        const expected = "2023-04-12";
        expect(aMonthAgo).toBe(expected);
    });

    it("Computes date from a year ago correctly", () => {
        // In date class month 4 corresponds to May (0 indexed)
        const date = new Date(2023, 4, 12);
        const daysDelta = 365;

        const aYearAgo = getDateWithDelta(date, daysDelta);
        // We expect the month to be May (04) in year 2022
        const expected = "2022-05-12";
        expect(aYearAgo).toBe(expected);
    });
});
