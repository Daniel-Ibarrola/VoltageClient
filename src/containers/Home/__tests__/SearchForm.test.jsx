import { expect, describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchForm } from "../SearchForm.jsx";


describe("SearchForm", () => {
    const props = {
        searchTerm: "Tonalapa",
        onSearchInput: vi.fn(),
    };

    it("calls onSearchInput on input field change", () => {
        render(<SearchForm {...props}/>);
        fireEvent.change(screen.getByDisplayValue("Tonalapa"), {
            target: {value: "Caracol"},
        });
        expect(props.onSearchInput).toHaveBeenCalledTimes(1);
    })
});
