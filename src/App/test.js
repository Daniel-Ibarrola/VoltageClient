import { describe, it, expect, vi} from "vitest";
import { actions, stationsReducer} from "./stationsReducer.js";

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