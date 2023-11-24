import {describe, expect, it} from "vitest";
import {lastReportTime, roundVoltage} from "../parseDate.js";


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


describe("roundVoltage", () => {
    it("rounds number if voltage is not null", () =>{
        expect(roundVoltage(22.5555)).toBe("22.56");
    });

    it("returns slash if voltage is null", () => {
        expect(roundVoltage(null)).toBe("-");
    });
})