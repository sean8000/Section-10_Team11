import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Role Tests", () => {
    test("Tests that there is a combobox", () => {
        render(<App />);
        expect(screen.queryAllByRole("combobox"));
    });
    test("Tests that the first role value is League Manager", () => {
        render(<App />);
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );
    });
    test("Tests that the changed value is Team Manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
    });
    test("Tests that the changed value is Guest User", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
    });
    test("Test adding user", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        userEvent.type(nameElement, "myName");
        expect(nameElement).toHaveValue("myName");
        const addButton = screen.getByTestId("addButton");
        addButton.click();
        userEvent.selectOptions(selectRole, "myName");
        expect(screen.getByLabelText("Which role")).toHaveValue("myName");
    });
    test("Test adding empty string, should not be possible", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        expect(selectRole).toHaveLength(3);
        userEvent.type(nameElement, "");
        expect(nameElement).toHaveValue("");
        const addButton = screen.getByTestId("addButton");
        addButton.click();
        //Stays the same length since you aren't allowed to enter an empty string
        expect(selectRole).toHaveLength(3);
    });
    test("Test adding duplicate user, shouldn't be possible", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        expect(selectRole).toHaveLength(3);
        userEvent.type(nameElement, "myName");
        expect(nameElement).toHaveValue("myName");
        const addButton = screen.getByTestId("addButton");
        addButton.click();
        //For added role
        expect(selectRole).toHaveLength(4);
        userEvent.type(nameElement, "myName");
        expect(nameElement).toHaveValue("myName");
        addButton.click();
        //Stays the same length since you aren't allowed to add duplicates
        expect(selectRole).toHaveLength(4);
    });
});
