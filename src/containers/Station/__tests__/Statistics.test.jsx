import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Statistics } from "../Statistics.jsx"


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


describe("Statistics", () => {
   it("renders correct data", () => {
       render(<Statistics data={data} />);
       // The date of the last report should appear
       expect(screen.queryByText(/31 de marzo de 2023/)).toBeInTheDocument();
       // The maximum and minimum voltages of the battery
       expect(screen.queryByText(/205/)).toBeInTheDocument();
       expect(screen.queryByText(/50.5/)).toBeInTheDocument();
       // The maximum and minimum voltages of the panel
       expect(screen.queryByText(/200.8/)).toBeInTheDocument();
       expect(screen.queryByText(/100.8/)).toBeInTheDocument();
   });
});
