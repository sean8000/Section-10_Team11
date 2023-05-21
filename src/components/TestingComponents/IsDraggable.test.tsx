import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Drag Tests", () => {
    test("Testing for original 30 player list", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing that draggable list doesn't exist when league manager", () => {
        render(<App />);
        expect(screen.queryByText(/Build Your Team/)).toBeNull();
        expect(screen.queryByText(/Manage Your Team/)).toBeNull();
    });
    test("Testing that draggable list appears when not league manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );
        expect(screen.getByText(/Manage Your Team/)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");
        expect(screen.getByText(/Build Your Team/)).toBeInTheDocument();
    });
    test("Testing that first player is draggable", () => {
        render(<App />);
        const firstListIndex = screen.getByTestId(0);
        expect(firstListIndex.draggable).toBe(true);
    });
    test("Testing that first player can be dragged to other list", () => {
        render(<App />);
        const firstListIndex = screen.getByTestId(0);
        expect(firstListIndex.draggable).toBe(true);
        //expect(firstListIndex.ondrop())
    });
});
