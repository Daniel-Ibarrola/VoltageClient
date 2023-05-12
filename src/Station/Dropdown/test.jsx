import { expect, describe, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Dropdown } from "./Dropdown.jsx";


describe("DropDown", () => {

    it("Calls onItemClick on item click", async () => {
        const props = {
            onItemClick: vi.fn(),
        }

       render(<Dropdown {...props}/>);
       await waitFor(async () => fireEvent.click(
           screen.getByRole("button"))
       );
       // screen.debug();
       await waitFor(async () => fireEvent.click(
            screen.getByText("Último mes"))
        );
       expect(props.onItemClick).toHaveBeenCalledTimes(1);
    });
});
