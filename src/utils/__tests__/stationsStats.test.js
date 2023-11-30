import {describe, expect, it} from "vitest";
import {getDataMax, getDataMin} from "../stationStats.js";


const data = [
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


describe("getMinVoltage",() => {
    it("Computes min voltage correctly", () => {
        expect(getDataMin(data, "battery")).toBe(50.5);
    });
});


describe("getMaxVoltage",() => {
    it("Computes max voltage correctly", () => {
        expect(getDataMax(data, "battery")).toBe(205.0);
    });
});
