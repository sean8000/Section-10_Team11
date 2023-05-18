import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Role Tests", () => {
    test("Tests that there is a role select/ combobox", () => {
        render(<App />);
        expect(screen.queryAllByRole("combobox"));
    });
    test("Test adding user then deleting", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        userEvent.type(nameElement, "myName");
        expect(nameElement).toHaveValue("myName");
        const addButton = screen.getByTestId("addButton");
        addButton.click();
        // 3 original roles + added one
        expect(selectRole).toHaveLength(4);
        const delButton = screen.getByTestId("delButton");
        userEvent.type(nameElement, "myName");
        delButton.click();
        expect(nameElement).toHaveValue("");
        // Added one has been deleted so 3 left
        expect(selectRole).toHaveLength(3);
    });
    test("Test deleting guest user", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        // 3 original roles
        expect(selectRole).toHaveLength(3);
        const delButton = screen.getByTestId("delButton");
        userEvent.type(nameElement, "Guest User");
        delButton.click();
        expect(nameElement).toHaveValue("");
        // Guest User has been deleted so 2 left
        expect(selectRole).toHaveLength(2);
    });
    test("Test deleting already deleted role", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        // 3 original roles
        expect(selectRole).toHaveLength(3);
        const delButton = screen.getByTestId("delButton");
        userEvent.type(nameElement, "Guest User");
        delButton.click();
        expect(nameElement).toHaveValue("");
        // Guest User has been deleted so 2 left
        expect(selectRole).toHaveLength(2);

        userEvent.type(nameElement, "Guest User");
        delButton.click();
        //GUest user has already been deleted so list stays same length
        expect(selectRole).toHaveLength(2);
    });
    test("Test deleting empty string", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        // 3 original roles
        expect(selectRole).toHaveLength(3);
        const delButton = screen.getByTestId("delButton");
        userEvent.type(nameElement, "");
        delButton.click();
        expect(nameElement).toHaveValue("");
        // Nothing should be deleted since it was an empty string
        expect(selectRole).toHaveLength(3);
    });
});
