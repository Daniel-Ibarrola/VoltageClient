import {describe, expect, it, vi} from "vitest";
import { screen, render } from "@testing-library/react";
import {VoltageChart} from "../VoltageChart.jsx";
import {ReportsChart} from "../ReportsChart.jsx";

const voltages = [
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

const reports = [
    {
        date: "2023-03-30",
        reports: 1,
    },
    {
        date: "2023-03-31",
        reports: 2,
    },
]


const setUpChartTest = () => {
    // Must mock resize and intersection observer for charts to work on test
    window.ResizeObserver = function () {
        return {
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        };
    };
    window.IntersectionObserver =  function() {
        return {
            observe: vi.fn(),
            disconnect: vi.fn(),
        };
    };
};

describe("VoltageChart", () => {
    it("Renders title and date ranges", () => {
        setUpChartTest();

        render(<VoltageChart voltages={voltages}/>)
        expect(screen.queryByText("Voltajes")).toBeInTheDocument();
        expect(screen.queryByText("30/03/2023 - 31/03/2023")).toBeInTheDocument();
    });
});


describe("ReportsChart", () => {
    it("Renders title and date ranges", () => {
        setUpChartTest();

        render(<ReportsChart reports={reports}/>)
        expect(screen.queryByText("Reportes")).toBeInTheDocument();
        expect(screen.queryByText("30/03/2023 - 31/03/2023")).toBeInTheDocument();
    });
})
