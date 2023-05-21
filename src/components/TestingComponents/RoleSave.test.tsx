import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing that list is saved upon role switch", () => {
    test("Testing user list should initially be empty", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        //const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        //addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
    });
    test("Testing adding player to user list as guest user", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
    });
    test("Testing adding player to user list as guest user, admin list should be empty", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );
        //data test id for admin list elements
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
    });
    test("Testing adding player to user list as guest user, admin list should be empty, switch back to Guest User", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );
        //data test id for admin list elements
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
    });
    test("Testing adding players to 2 roles, switching back and forth between them ", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );
        //data test id for admin list elements
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const addFromAdmin = screen.getByTestId("adminButton" + 0);

        addFromAdmin.click();
        expect(screen.getByTestId("otherAdmin" + 0)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.getByTestId("otherAdmin" + 0)).toBeInTheDocument();
    });
    test("Testing adding player to new user myName, switching to guest user and adding then back to myName, then back to guest user", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        userEvent.type(nameElement, "myName");
        expect(nameElement).toHaveValue("myName");
        const addButton = screen.getByTestId("addButton");
        addButton.click();
        userEvent.selectOptions(selectRole, "myName");
        expect(screen.getByLabelText("Role Select")).toHaveValue("myName");

        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.queryByTestId("othermyName" + 0)).toBeNull();
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        userEvent.selectOptions(selectRole, "myName");
        expect(screen.getByLabelText("Role Select")).toHaveValue("myName");
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        const addOtherFirstPlayerButton = screen.getByTestId("userButton" + 0);
        addOtherFirstPlayerButton.click();
        expect(screen.getByTestId("othermyName" + 0)).toBeInTheDocument();

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.queryByTestId("othermyName" + 0)).toBeNull();

        userEvent.selectOptions(selectRole, "myName");
        expect(screen.getByLabelText("Role Select")).toHaveValue("myName");
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.getByTestId("othermyName" + 0)).toBeInTheDocument();
    });
});
