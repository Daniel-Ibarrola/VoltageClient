import { BrowserRouter } from "react-router-dom";
import { expect, describe, it } from "vitest";
import {render, screen} from "@testing-library/react";
import { Table } from "../Table.jsx";


describe("Table", () => {

    const stationOne = {
        station: "Caracol",
        date:  "2023-03-31T00:00:00",
        battery: 300.1255555,
        panel: 100.505555,
    };

    const stationTwo = {
        station: "Tonalapa",
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
