import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Edit Players From user", () => {
    test("Testing That this object doesn't exist in the edit list if not placed there by user", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const editButton = screen.getByTestId("Guest UserEditButton");
        editButton.click();

        expect(screen.queryByTestId("otherGuest User0")).toBeNull();
    });
    test("Testing That Player can be added and then displayed after in the edit component", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        expect(screen.queryByTestId("otherGuest User0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Guest UserEditButton");
        editButton.click();
        //This is the testid to the div of the rendered player component in edit
        expect(screen.getByTestId("otherGuest User0")).toBeInTheDocument();
    });
    test("Testing That one of the players stats in the dictionary can be edited", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        expect(screen.queryByTestId("otherGuest User0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Guest UserEditButton");
        editButton.click();
        //This is the testid to the div of the rendered player component in edit
        expect(screen.getByTestId("otherGuest User0")).toBeInTheDocument();

        const changeTouchdowns = screen.getByLabelText("Touchdowns");
        userEvent.type(changeTouchdowns, "{selectall}{backspace}");
        userEvent.type(changeTouchdowns, "1");
        expect(changeTouchdowns).toHaveValue(1);
    });
    test("Testing That the changed stat is reflected in the list after leaving edit mode", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        expect(screen.queryByTestId("otherGuest User0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Guest UserEditButton");
        editButton.click();
        //This is the testid to the div of the rendered player component in edit
        expect(screen.getByTestId("otherGuest User0")).toBeInTheDocument();

        const changeTouchdowns = screen.getByLabelText("Touchdowns");
        userEvent.type(changeTouchdowns, "{selectall}{backspace}");
        userEvent.type(changeTouchdowns, "1");
        expect(changeTouchdowns).toHaveValue(1);

        const leaveButton = screen.getByTestId("Guest UserLeaveEditButton");
        leaveButton.click();

        const statsButtonGuestUser0 = screen.getByTestId(
            "statsButtonGuest User0"
        );
        statsButtonGuestUser0.click();

        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Touchdowns: 1"
        );
    });
    test("Testing changing all stats and returning to draggable lists", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        expect(screen.queryByTestId("otherGuest User0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Guest UserEditButton");
        editButton.click();
        //This is the testid to the div of the rendered player component in edit
        expect(screen.getByTestId("otherGuest User0")).toBeInTheDocument();

        const changeTouchdowns = screen.getByLabelText("Touchdowns");
        userEvent.type(changeTouchdowns, "{selectall}{backspace}");
        userEvent.type(changeTouchdowns, "1");
        expect(changeTouchdowns).toHaveValue(1);

        const changeReceptions = screen.getByLabelText("Receptions");
        userEvent.type(changeReceptions, "{selectall}{backspace}");
        userEvent.type(changeReceptions, "1");
        expect(changeReceptions).toHaveValue(1);

        const changeRushAttempts = screen.getByLabelText("Rush Attempts");
        userEvent.type(changeRushAttempts, "{selectall}{backspace}");
        userEvent.type(changeRushAttempts, "1");
        expect(changeRushAttempts).toHaveValue(1);

        const changeTotalYards = screen.getByLabelText("Total Yards");
        userEvent.type(changeTotalYards, "{selectall}{backspace}");
        userEvent.type(changeTotalYards, "1");
        expect(changeTotalYards).toHaveValue(1);

        const leaveButton = screen.getByTestId("Guest UserLeaveEditButton");
        leaveButton.click();

        const statsButtonGuestUser0 = screen.getByTestId(
            "statsButtonGuest User0"
        );
        statsButtonGuestUser0.click();

        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Touchdowns: 1"
        );
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Receptions: 1"
        );
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Rush Attempts: 1"
        );
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Yards: 1"
        );
    });
    test("Making sure there is no place for the user to change anything that isn't a dictionary stat or rating", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        expect(screen.queryByTestId("otherGuest User0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Guest UserEditButton");
        editButton.click();
        //This is the testid to the div of the rendered player component in edit
        expect(screen.getByTestId("otherGuest User0")).toBeInTheDocument();
        //If the the role is not admin, these labels won't appear
        expect(screen.queryByLabelText("Name")).toBeNull();
        expect(screen.queryByLabelText("Description")).toBeNull();
        expect(screen.queryByLabelText("Image")).toBeNull();
        expect(screen.queryByLabelText("Position")).toBeNull();
    });
});
