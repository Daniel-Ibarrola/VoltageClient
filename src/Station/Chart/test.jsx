import { describe, expect, it } from "vitest";
import { getVoltageDataForPlot, getReportDataForPlot } from "./plotData.js";

describe("getVoltageDataForPlot", () => {

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
