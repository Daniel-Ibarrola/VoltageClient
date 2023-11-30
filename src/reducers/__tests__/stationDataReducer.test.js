import {describe, expect, it} from "vitest";
import {STATION_ACTION, stationDataReducer} from "../stationDataReducer.js";


describe("stationDataReducer", () => {

    const reports = [
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
    ];

    const reportsCounts = [
        {
            date: "2023-03-30",
            reports: 1,
        },
        {
            date: "2023-03-31",
            reports: 2,
        },
    ];

    it("initiating fetch sets loading state", () => {
        const action = { type: STATION_ACTION.INIT_FETCH };
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

    it("updates reports voltage data on successful fetching", () => {
        const action = {
            type: STATION_ACTION.SUCCESS_FETCH_REPORTS,
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
            voltages: reports,  // Home should be sorted
            reports: [],
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("updates report count data on successful fetching", () => {
        const action = {
            type: STATION_ACTION.SUCCESS_FETCH_COUNT,
            payload: reportsCounts
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
            reports: reportsCounts,
            isLoading: false,
            isError: false,
            name: "Tonalapa"
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("sets error state on fetch fail", () => {
        const action = { type: STATION_ACTION.FAIL_FETCH };
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
