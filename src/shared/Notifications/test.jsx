import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { Notifications } from "./Notifications.jsx";
import { getStationsWithIssues } from "./reports.js";


describe("Notifications", () => {
   it ("Renders toast if station last report is past tolerance date", () => {
       const lastReports = [{
           name: "Caracol",
           date:  "2023-03-31T00:00:00",
           battery: 300.12,
           panel: 100.50,
       }]
       render(<Notifications reports={lastReports} />);
       expect(screen.queryByText(/Alerta/)).toBeInTheDocument();
       expect(screen.queryByText(/Caracol no se ha reportado/)).toBeInTheDocument();
   });

   it("Renders toast if voltage is below threshold", () => {
      const lastReports = [{
          name: "Caracol",
          date: new Date(Date.now()).toDateString(),
          battery: 5,
          panel: 100,
      }]
      render(<Notifications reports={lastReports}/>);
      expect(screen.queryByText(/Alerta/)).toBeInTheDocument();
      expect(screen.queryByText(/Caracol: voltaje por debajo/)).toBeInTheDocument();
   });

   it("Doesn't render toast if everything is alright", () => {
       const lastReports = [{
           name: "Caracol",
           date: new Date(Date.now()).toDateString(),
           battery: 100,
           panel: 100,
       }]
       render(<Notifications reports={lastReports} />);
       expect(screen.queryByText(/Alerta/)).toBeNull();
   });

    it("Can render multiple toasts", () => {
        const lastReports = [
            {
                name: "Caracol",
                date: new Date(Date.now()).toDateString(),
                battery: 5,
                panel: 100,
            },
            {
                name: "Tonalapa",
                date:  "2023-03-31T00:00:00",
                battery: 300.12,
                panel: 100.50,
            }
        ]
        render(<Notifications reports={lastReports} />);
        expect(screen.queryAllByText(/Alerta/).length).toBe(2);
        expect(screen.queryByText(/Caracol: voltaje por debajo/)).toBeInTheDocument();
        expect(screen.queryByText(/Tonalapa no se ha reportado/)).toBeInTheDocument();
    });
});

describe("getStationsWithIssues", () => {
    it("Gets stations whose last report is past tolerance", () => {
        const lastReports = [{
            name: "Caracol",
            date:  "2023-03-31T00:00:00",
            battery: 300.12,
            panel: 100.50,
        }]
        const stations = getStationsWithIssues(lastReports);
        expect(stations.length).toBe(1);
        expect(stations[0].name).toBe("Caracol");
        expect(stations[0].body).toBe(
            "Caracol no se ha reportado desde 31 de marzo de 2023, 00:00:00"
        );
    });

    it("Gets stations whose voltage is below threshold", () => {
        const lastReports = [{
            name: "Caracol",
            date: new Date(Date.now()).toDateString(),
            battery: 100,
            panel: 5,
        }]

        const stations = getStationsWithIssues(lastReports);
        expect(stations.length).toBe(1);
        expect(stations[0].name).toBe("Caracol");
        expect(stations[0].body).toBe("Caracol: voltaje por debajo de 10 volts");
    });
});
