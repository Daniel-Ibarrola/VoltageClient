import {describe, expect, it} from "vitest";
import {getDateWithDelta} from "../dateDelta.js";


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