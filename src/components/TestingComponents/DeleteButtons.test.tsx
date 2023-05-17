import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
describe("Deleting Players as different roles", () => {
    test("Deleting as guest user", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();

        const deleteFirstPlayerButton = screen.getByTestId(
            "deleteButtonGuest User0"
        );

        deleteFirstPlayerButton.click();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(
            screen.getByText(/Current player count in the central list is: 30/)
        ).toBeInTheDocument();
    });
    test("Deleting as Team Manager", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");

        const addFirstPlayerButton = screen.getByTestId("adminButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherAdmin" + 0)).toBeInTheDocument();

        const deleteFirstPlayerButton =
            screen.getByTestId("deleteButtonAdmin0");

        deleteFirstPlayerButton.click();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
        expect(
            screen.getByText(/Current player count in the central list is: 30/)
        ).toBeInTheDocument();
    });
    test("Deleting as Team Manager", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.getByText(/Christian Mc/i)).toBeInTheDocument();
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );
        //Now Added player is in the other list, index 0 in the draggable list

        const deleteFirstPlayerButton =
            screen.getByTestId("deleteButtonSuper0");

        deleteFirstPlayerButton.click();
        expect(screen.queryByText(/Christian Mc/i)).toBeNull();
        expect(
            screen.getByText(/Current player count in the central list is: 29/)
        ).toBeInTheDocument();
    });
});
