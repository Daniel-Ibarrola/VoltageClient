import {describe, expect, it} from "vitest";
import {STATION_ACTION, stationDataReducer} from "../stationDataReducer.js";

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

describe("stationDataReducer", () => {
    it("initiating fetch sets loading state", () => {
        const action = { type: STATION_ACTION.initFetch };
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
            type: STATION_ACTION.successFetchStations,
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
            voltages: voltages,  // Home should be sorted
            reports: [],
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("updates report count data on successful fetching", () => {
        const action = {
            type: STATION_ACTION.successFetchReportCount,
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
            voltages: [],  // Home should be sorted
            reports: reports,
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("sets error state on fetch fail", () => {
        const action = { type: STATION_ACTION.failFetch };
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
