import {describe, expect, it} from "vitest";
import {getDateWithDelta, lastReportTime, parseReportDate, getDateRange} from "../dates.js";


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


describe("lastReportTime", () => {
    it("null date str returns slash", () => {
        expect(lastReportTime(null)).toBe("-");
    }) ;

    it("date less than one hour ago", () => {
        const date = new Date(Date.now());
        date.setHours(date.getHours() - 0.5);
        expect(lastReportTime(date)).toBe("Hace unos minutos");
    });

    it("date less than six hours ago", () => {
        const date = new Date(Date.now());
        date.setHours(date.getHours() - 3);
        expect(lastReportTime(date)).toBe("Hace menos de 6 hrs");
    });

    it("date less than twelve hours ago", () => {
        const date = new Date(Date.now());
        date.setHours(date.getHours() - 8);
        expect(lastReportTime(date)).toBe("Hace menos de 12 hrs");
    });

    it("date less than a day ago", () => {
        const date = new Date(Date.now());
        date.setHours(date.getHours() - 16);
        expect(lastReportTime(date)).toBe("Hace menos de 24 hrs");
    });

    it("date more than a day ago", () => {
        const date = new Date(Date.now());
        date.setHours(date.getHours() - 36);
        expect(lastReportTime(date)).toBe("Hace más de 24 hrs");
    });
});


describe("getDateRange", () => {
    it("Gets date range for voltage data", () => {
        expect(getDateRange(voltages)).toBe("30/03/2023 - 31/03/2023");
    });

    it("Gets date range fro, reports data", () => {
        expect(getDateRange(reports)).toBe("30/03/2023 - 31/03/2023");
    });
});


describe("parseReportDate", () => {
    it("Gets correct date", () => {
        const date = parseReportDate("2023-03-30");
        expect(date.getDate()).toBe(30);
        expect(date.getFullYear()).toBe(2023);
        expect(date.getMonth() + 1).toBe(3);
    });
});