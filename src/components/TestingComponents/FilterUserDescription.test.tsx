import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
describe("Filtering players by description search, as a user", () => {
    test("Testing filtering 1 player list as guest user, when nothing is in text box,player should be displayed", () => {
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
        // 1 in central 1 in user list
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        const searchDesc = screen.getByLabelText(
            "User Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "");
        expect(searchDesc).toHaveValue("");
        // 1 in central 1 in user list since it was not filterd out
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
    });
    test("Testing filtering 1 player list as guest user, when San Francisco is in text box, player should be displayed", () => {
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
        // 1 in central 1 in user list
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        const searchDesc = screen.getByLabelText(
            "User Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "San Francisco");
        expect(searchDesc).toHaveValue("San Francisco");
        // 1 in central 1 in user list since it was not filtered out
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
    });
    test("Testing filtering 1 player list as guest user, when Bengals is in text box, player should not be displayed", () => {
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
        // 1 in central 1 in user list
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        const searchDesc = screen.getByLabelText(
            "User Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "Bengals");
        expect(searchDesc).toHaveValue("Bengals");
        // user list 1 is no longer displayed because of search filter, so only 1 left
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(1);
    });

    test("Testing filtering by word inside of description, but not beginning with it", () => {
        render(<App />);
        expect(screen.getByTestId(2)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addThirdPlayerButton = screen.getByTestId("userButton" + 2);

        addThirdPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        // 1 in central 1 in user list
        expect(screen.queryAllByText(/Joe Burrow/i)).toHaveLength(2);
        const searchDesc = screen.getByLabelText(
            "User Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "Bengals");
        expect(searchDesc).toHaveValue("Bengals");
        // 2 since user list one was not filtered out, since his description includes Bengals in the second word
        expect(screen.queryAllByText(/Joe Burrow/i)).toHaveLength(2);
    });
    test("Testing filtering 2 players, both with different teams/descriptions", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.queryByTestId("otherGuest User" + 0)).toBeNull();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        addFirstPlayerButton.click();

        const addThirdPlayerButton = screen.getByTestId("userButton" + 2);
        addThirdPlayerButton.click();

        //Now Added player is in the other list, index 0 in the draggable list
        expect(screen.getByTestId("otherGuest User" + 0)).toBeInTheDocument();
        expect(screen.getByTestId("otherGuest User" + 1)).toBeInTheDocument();
        // 1 in central 1 in user list
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        expect(screen.queryAllByText(/Joe Burrow/i)).toHaveLength(2);
        const searchDesc = screen.getByLabelText(
            "User Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "San Francisco");
        expect(searchDesc).toHaveValue("San Francisco");
        // 1 in central 1 in user list since it was not filtered out
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        // 1 in central since 1 in user list was filtered out
        expect(screen.queryAllByText(/Joe Burrow/i)).toHaveLength(1);

        userEvent.type(searchDesc, "{selectall}{backspace}");
        userEvent.type(searchDesc, "Bengals");

        // 1 in central since 1 in user list was filtered out
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(1);
        // 1 in central 1 in user list since it was not filtered out
        expect(screen.queryAllByText(/Joe Burrow/i)).toHaveLength(2);

        userEvent.type(searchDesc, "{selectall}{backspace}");

        //Neither filtered out since search box is blank
        expect(screen.queryAllByText(/Christian Mc/i)).toHaveLength(2);
        expect(screen.queryAllByText(/Joe Burrow/i)).toHaveLength(2);
    });
});
