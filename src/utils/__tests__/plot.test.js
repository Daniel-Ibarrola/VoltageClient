import {describe, expect, it} from "vitest";
import {getReportDataForPlot, getVoltageDataForPlot} from "../plot.js";


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
            "30/03 12:00",
            "31/03 00:00",
            "31/03 12:00",
        ]
        expect(data.labels).toStrictEqual(labels);
        expect(data.datasets[0].label).toBe("Batería");
        expect(data.datasets[0].data).toStrictEqual([205.0, 100.5, 50.5]);
        expect(data.datasets[1].label).toBe("Panel");
        expect(data.datasets[1].data).toStrictEqual([100.80, 200.80, 150.80]);
    });
});


describe("getReportDataForPlot", () => {
    it("Gets correct data", () => {
        const data = getReportDataForPlot(reports);
        const labels = [
            "30/03",
            "31/03",
        ];
        expect(data.labels).toStrictEqual(labels);
        expect(data.datasets[0].data).toStrictEqual([1, 2]);
    })
});
