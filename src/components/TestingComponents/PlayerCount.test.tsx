import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
/*
For some reason, across this entire file in particular, changes made in one test are affecting the other tests,
even rerendering app doesn't do anything and I'm not sure why, this doesn't happen in the actual website, when 
the website is refreshed all counts are reset back to 0. So I'll be using all different players in each test
in order to get around this issue.
*/

describe("Player count in central list, visible by super only", () => {
    test("Testing that player count of the first player is initially 0 when super", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );

        expect(screen.getByTestId("0")).toHaveTextContent("No. In Use: 0");
    });
    test("Testing that there is a player added in the guest list now", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();
        expect(screen.getByTestId(0)).toBeInTheDocument();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        expect(screen.getByTestId("0")).toHaveTextContent("No. In Use: 0");

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
    });
    test("Testing that player added change is reflected in central list count when super", () => {
        render(<App />);
        expect(screen.getByTestId(1)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        expect(screen.getByTestId("1")).toHaveTextContent("No. In Use: 0");

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 1);

        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();

        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        //Number is now one because of player being added to guest user list
        expect(screen.getByTestId("1")).toHaveTextContent("No. In Use: 1");
    });
    test("Testing count when duplicates are added", () => {
        render(<App />);
        expect(screen.getByTestId(2)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        expect(screen.getByTestId("2")).toHaveTextContent("No. In Use: 0");

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 2);

        addFirstPlayerButton.click();
        addFirstPlayerButton.click();
        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.getByTestId("otherGuest User" + 1)).toBeInTheDocument();
        expect(screen.getByTestId("otherGuest User" + 2)).toBeInTheDocument();

        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        //Number is now one because of player being added to guest user list
        expect(screen.getByTestId("2")).toHaveTextContent("No. In Use: 3");
    });
    test("Testing count when duplicates are added then deleted", () => {
        render(<App />);
        expect(screen.getByTestId(3)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        expect(screen.getByTestId("3")).toHaveTextContent("No. In Use: 0");

        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 3);

        addFirstPlayerButton.click();
        addFirstPlayerButton.click();
        addFirstPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.getByTestId("otherGuest User" + 1)).toBeInTheDocument();
        expect(screen.getByTestId("otherGuest User" + 2)).toBeInTheDocument();

        const deleteFirstPlayerButton = screen.getByTestId(
            "deleteButtonGuest User2"
        );

        deleteFirstPlayerButton.click();
        userEvent.selectOptions(selectRole, "League Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "League Manager"
        );
        //Number is now one because of player being added to guest user list
        expect(screen.getByTestId("3")).toHaveTextContent("No. In Use: 2");
    });
});
