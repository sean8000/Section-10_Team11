import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing that list is saved upon role switch", () => {
    test("Testing user list should initially be empty", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        //const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        //addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull;
    });
    test("Testing adding player to user list as guest user", () => {
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
    });
    test("Testing adding player to user list as guest user, admin list should be empty", () => {
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
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
        //data test id for admin list elements
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
    });
    test("Testing adding player to user list as guest user, admin list should be empty, switch back to Guest User", () => {
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
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
        //data test id for admin list elements
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
    });
    test("Testing adding players to 2 roles, switching back and forth between them ", () => {
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
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
        //data test id for admin list elements
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const addFromAdmin = screen.getByTestId("adminButton" + 0);

        addFromAdmin.click();
        expect(screen.getByTestId("otherAdmin" + 0)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.getByTestId("otherAdmin" + 0)).toBeInTheDocument();
    });
});
