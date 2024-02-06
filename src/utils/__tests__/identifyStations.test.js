import {describe, expect, it} from "vitest";
import {identifyStations} from "../identifyStations.js";


describe("identifyStations", () => {
    it("Gets stations whose last report is past tolerance", () => {
        const lastReports = [{
            station: "Caracol",
            date:  "2023-03-31T00:00:00",
            battery: 300.12,
            panel: 100.50,
        }]
        const stations = identifyStations(lastReports);
        expect(stations.length).toBe(1);
        expect(stations[0].station).toBe("Caracol");
        expect(stations[0].body).toBe(
            "Caracol no se ha reportado desde 31 de marzo de 2023, 00:00:00"
        );
    });

    it("Gets stations whose voltage is below threshold", () => {
        const lastReports = [{
            station: "Caracol",
            date: new Date(Date.now()).toDateString(),
            battery: 100,
            panel: 5,
        }]

        const stations = identifyStations(lastReports);
        expect(stations.length).toBe(1);
        expect(stations[0].station).toBe("Caracol");
        expect(stations[0].body).toBe("Caracol: voltaje por debajo de 10 volts");
    });
});