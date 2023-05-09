import {describe, expect, it, vi} from "vitest";
import { screen, render } from "@testing-library/react";
import {
    getVoltageDataForPlot,
    getReportDataForPlot,
    getDateRange,
    parseReportDate,
} from "./plotData.js";
import {VoltageChart} from "./VoltageChart.jsx";
import {ReportsChart} from "./ReportsChart.jsx";

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


describe("getVoltageDataForPlot", () => {
    it("Gets correct data", () => {
        const data = getVoltageDataForPlot(voltages);
        const labels = [
            "03/30 12:00",
            "03/31 00:00",
            "03/31 12:00",
        ]
        const expected = {
            labels,
            datasets: [
                {
                    label: "Batería",
                    data: [205.0, 100.5, 50.5],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: "Panel",
                    data: [100.80, 200.80, 150.80],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ]
        };
        expect(data).toStrictEqual(expected);
    });
});


describe("getReportDataForPlot", () => {
    it("Gets correct data", () => {
        const data = getReportDataForPlot(reports);
        const expected = {
            datasets: [
                {
                    label: "Número de reportes",
                    data: [
                        {x: 0, y: 1},
                        {x: 1, y: 2},
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                }
            ]
        }
        expect(data).toStrictEqual(expected);
    })
});

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
})