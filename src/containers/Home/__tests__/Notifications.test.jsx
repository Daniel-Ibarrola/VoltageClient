import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { Notifications } from "../Notifications.jsx";


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
