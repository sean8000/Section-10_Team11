import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing User Rating", () => {
    test("Testing original rating before change", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        const player1 = screen.getByTestId("otherGuest User" + 0);
        console.log(screen.getByTestId("otherGuest User" + 0));

        const ratingBox = screen.getByLabelText(/Rating Box/);
        //The first player in the list has an initial rating of 95
        expect(ratingBox).toHaveValue(95);
        //This is his actual rating as a player in the list, which the rating box changes
        expect(player1).toHaveTextContent("Overall: 95");
    });
    test("Testing Changing value from 95 to 90", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        const player1 = screen.getByTestId("otherGuest User" + 0);
        console.log(screen.getByTestId("otherGuest User" + 0));

        const ratingBox = screen.getByLabelText(/Rating Box/);
        userEvent.type(ratingBox, "{backspace}0");
        expect(ratingBox).toHaveValue(90);
        //This is his actual rating as a player in the list(The player list we fed it originally,
        //not what is displayed), which the rating box changes
        expect(player1).toHaveTextContent("Overall: 90");
    });
    test("Testing Changing value to 50", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        const player1 = screen.getByTestId("otherGuest User" + 0);
        console.log(screen.getByTestId("otherGuest User" + 0));

        const ratingBox = screen.getByLabelText(/Rating Box/);
        userEvent.type(
            ratingBox,
            "{backspace}5{arrowleft}{backspace}{arrowright}0"
        );
        expect(ratingBox).toHaveValue(50);
        //This is his actual rating as a player in the list(The player list we fed it originally,
        //not what is displayed), which the rating box changes
        expect(player1).toHaveTextContent("Overall: 50");
    });
    test("Testing Changing value to 0", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        const player1 = screen.getByTestId("otherGuest User" + 0);
        console.log(screen.getByTestId("otherGuest User" + 0));

        const ratingBox = screen.getByLabelText(/Rating Box/);
        userEvent.type(ratingBox, "{backspace}0{arrowleft}{backspace}");
        expect(ratingBox).toHaveValue(0);
        //This is his actual rating as a player in the list(The player list we fed it originally,
        //not what is displayed), which the rating box changes
        expect(player1).toHaveTextContent("Overall: 0");
    });
    test("Testing Changing value to 101, not possible will stay at 100", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        const player1 = screen.getByTestId("otherGuest User" + 0);
        console.log(screen.getByTestId("otherGuest User" + 0));

        const ratingBox = screen.getByLabelText(/Rating Box/);
        userEvent.type(
            ratingBox,
            "{backspace}1{arrowleft}{backspace}{arrowright}001"
        );
        expect(ratingBox).toHaveValue(100);
        //This is his actual rating as a player in the list(The player list we fed it originally,
        //not what is displayed), which the rating box changes
        expect(player1).toHaveTextContent("Overall: 100");
    });
    test("Testing Changing value to -1, not possible since - is not a number, stays at 1", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherAdmin" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        const player1 = screen.getByTestId("otherGuest User" + 0);
        console.log(screen.getByTestId("otherGuest User" + 0));

        const ratingBox = screen.getByLabelText(/Rating Box/);
        userEvent.type(ratingBox, "{backspace}1{arrowleft}{backspace}-");
        expect(ratingBox).toHaveValue(1);
        console.log("for merge, can be deleted after");
        //This is his actual rating as a player in the list(The player list we fed it originally,
        //not what is displayed), which the rating box changes
        expect(player1).toHaveTextContent("Overall: 1");
    });
});
