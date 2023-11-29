import {describe, expect, it} from "vitest";
import {roundVoltage} from "../numeric.js";


describe("roundVoltage", () => {
    it("rounds number if voltage is not null", () =>{
        expect(roundVoltage(22.5555)).toBe("22.56");
    });

    it("returns slash if voltage is null", () => {
        expect(roundVoltage(null)).toBe("-");
    });
})