import {describe, expect, it} from "vitest";
import {STATIONS_ACTIONS, stationsReducer} from "../stationsReducer.js";

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
        const action = { type: STATIONS_ACTIONS.INIT_FETCH };
        const state = {
            data: stations,
            display: stations,
            isLoading: false,
            error: "",
            searchTerm: "",
        };

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: stations,
            display: stations,
            isLoading: true,
            error: "",
            searchTerm: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("updates data on successful fetching", () => {
        const action = {
            type: STATIONS_ACTIONS.SUCCESS_FETCH,
            payload: stations
        };
        const state = {
            data: [],
            display: [],
            isLoading: true,
            error: "",
            searchTerm: "Caracol",
        }

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: stations,  // Home should be sorted
            display: [stationOne],
            isLoading: false,
            error: "",
            searchTerm: "Caracol",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("sets error state on fetch fail", () => {
        const action = {
            type: STATIONS_ACTIONS.FAIL_FETCH,
            payload: "Error fetching data"
        };
        const state = {
            data: [],
            display: [],
            isLoading: true,
            error: "",
            searchTerm: "",
        };

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: [],
            display: [],
            isLoading: false,
            error: "Error fetching data",
            searchTerm: "",
        }
        expect(newState).toStrictEqual(expectedState);
    });

    it("search updates displayed data", () => {
        const action = {
            type: STATIONS_ACTIONS.SEARCH, payload: "Caracol"
        };
        const state = {
            data: stations,
            display: [],
            isLoading: false,
            error: "",
            searchTerm: "",
        };

        const newState = stationsReducer(state, action);
        const expectedState = {
            data: stations,
            display: [stationOne],
            isLoading: false,
            error: "",
            searchTerm: "Caracol",
        }
        expect(newState).toStrictEqual(expectedState);
    });
});
