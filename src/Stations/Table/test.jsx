import { BrowserRouter } from "react-router-dom";
import { expect, describe, it } from "vitest";
import {render, screen} from "@testing-library/react";
import { Table } from "./Table.jsx";
import { lastReportTime, roundVoltage } from "./parse.js";


describe("roundVoltage", () => {
    it("rounds number if voltage is not null", () =>{
        expect(roundVoltage(22.5555)).toBe("22.56");
    });

    it("returns slash if voltage is null", () => {
       expect(roundVoltage(null)).toBe("-");
    });
})

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

describe("Table", () => {

    const stationOne = {
        name: "Caracol",
        date:  "2023-03-31T00:00:00",
        battery: 300.1255555,
        panel: 100.505555,
    };

    const stationTwo = {
        name: "Tonalapa",
        date:  "2023-03-31T00:00:00",
        battery: 150.24555,
        panel: 200.15555,
    };

    const props = {
        data: [stationOne, stationTwo],
    };

   it("renders all data", () => {
       render(<BrowserRouter><Table {...props}/></BrowserRouter> );
       // One row for the header + 2 of data
       expect(screen.getAllByRole("row").length).toBe(3);
       expect(screen.queryByText("Caracol")).toBeInTheDocument();
       expect(screen.queryByText("Tonalapa")).toBeInTheDocument();
   });
});
