import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Edit Players From Super", () => {
    test("Testing upon editing, there are already 30 users in your list than you can edit since you're the super", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );

        const editButton = screen.getByTestId("League ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherLeague Manager29")).toBeInTheDocument();
        //If 29 is in the document, because 29 is referring to index 29 the other 29 players must
        //already be rendered
    });
    test("Testing That A Player can be edited after the edit is clicked", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );

        const editButton = screen.getByTestId("League ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherLeague Manager29")).toBeInTheDocument();
        //If 29 is in the document, because 29 is referring to index 29 the other 29 players must
        //already be rendered

        const changeName = screen.getByLabelText("Name");
        userEvent.type(changeName, "{selectall}{backspace}");
        userEvent.type(changeName, "Justin Korup");
        expect(changeName).toHaveValue("Justin Korup");
        //For the text in the box, and the name actually being rendered on the screen
        expect(screen.getByText(/Justin Korup/)).toBeInTheDocument();
    });
    test("Testing That a player will still be edited in the central list after leaving edit mode, changing name", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );

        const editButton = screen.getByTestId("League ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherLeague Manager29")).toBeInTheDocument();
        //If 29 is in the document, because 29 is referring to index 29 the other 29 players must
        //already be rendered

        const changeName = screen.getByLabelText("Name");
        userEvent.type(changeName, "{selectall}{backspace}");
        userEvent.type(changeName, "Justin Korup");
        expect(changeName).toHaveValue("Justin Korup");
        //For the text in the box, and the name actually being rendered on the screen
        expect(screen.getByText(/Justin Korup/)).toBeInTheDocument();

        const leaveButton = screen.getByTestId("League ManagerLeaveEditButton");
        leaveButton.click();
        //Since Justin Korup is displayed in the central list, and league manager can only access the central list
        expect(screen.getByText(/Justin Korup/)).toBeInTheDocument();
    });
    test("Testing That a player will still be edited in the central list after leaving edit mode, this time changing stats", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );

        const editButton = screen.getByTestId("League ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherLeague Manager29")).toBeInTheDocument();
        //If 29 is in the document, because 29 is referring to index 29 the other 29 players must
        //already be rendered

        const changeTouchdowns = screen.getByLabelText("Touchdowns");
        userEvent.type(changeTouchdowns, "{selectall}{backspace}");
        userEvent.type(changeTouchdowns, "1");
        expect(changeTouchdowns).toHaveValue(1);
        //For the text in the box, and the name actually being rendered on the screen
        const leaveButton = screen.getByTestId("League ManagerLeaveEditButton");
        leaveButton.click();
        //Since Justin Korup is displayed in the central list, and league manager can only access the central list

        const statsButtonSuper0 = screen.getByTestId("statsButtonSuper0");
        statsButtonSuper0.click();

        expect(screen.getByText(/Touchdowns: 1/)).toBeInTheDocument();
    });
    test("After editing a player in super, should be seen as a user in the central list", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );

        const editButton = screen.getByTestId("League ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherLeague Manager29")).toBeInTheDocument();
        //If 29 is in the document, because 29 is referring to index 29 the other 29 players must
        //already be rendered

        const changeName = screen.getByLabelText("Name");
        userEvent.type(changeName, "{selectall}{backspace}");
        userEvent.type(changeName, "Justin Korup");
        expect(changeName).toHaveValue("Justin Korup");
        //For the text in the box, and the name actually being rendered on the screen
        expect(screen.getByText(/Justin Korup/)).toBeInTheDocument();

        const leaveButton = screen.getByTestId("League ManagerLeaveEditButton");
        leaveButton.click();
        //Since Justin Korup is displayed in the central list, and league manager can only access the central list
        expect(screen.getByText(/Justin Korup/)).toBeInTheDocument();

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
        //Still in the document under the central list even after switch to another user
        expect(screen.getByText(/Justin Korup/)).toBeInTheDocument();
    });
});
