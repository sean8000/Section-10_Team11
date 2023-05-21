import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Filter in central list", () => {
    beforeEach(() => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.getByTestId(1)).toBeInTheDocument();

        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        const addSecondPlayerButton = screen.getByTestId("userButton" + 1);

        addFirstPlayerButton.click();
        addSecondPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
    });

    test("Testing no sort", () => {
        //We use the same component to display the super and user sort, the second one is the user sort
        //const sortButton = screen.queryAllByLabelText(/Sort Options/)[1];
        expect(screen.queryAllByTestId("sort")).toHaveLength(2);
        const sortButton = screen.queryAllByTestId("sort")[1];
        userEvent.selectOptions(sortButton, "None");
        //Both are now in the user list, with a filter of none both are displayed in the order they were inserted
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Christian"
        );
        expect(screen.getByTestId("otherGuest User1")).toHaveTextContent(
            "George"
        );
    });
    test("Testing sort by position", () => {
        //We use the same component to display the super and user sort, the second one is the user sort
        //const sortButton = screen.queryAllByLabelText(/Sort Options/)[1];
        expect(screen.queryAllByTestId("sort")).toHaveLength(2);
        const sortButton = screen.queryAllByTestId("sort")[1];
        userEvent.selectOptions(sortButton, "Position");
        //Christian is a RB, George is a TE, so they are ordered the same as before
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Christian"
        );
        expect(screen.getByTestId("otherGuest User1")).toHaveTextContent(
            "George"
        );
    });
    test("Testing sort by Rating", () => {
        //We use the same component to display the super and user sort, the second one is the user sort
        //const sortButton = screen.queryAllByLabelText(/Sort Options/)[1];
        expect(screen.queryAllByTestId("sort")).toHaveLength(2);
        const sortButton = screen.queryAllByTestId("sort")[1];
        userEvent.selectOptions(sortButton, "Rating");
        //George has a higher rating than Christian, so now he will be rendered first
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "George"
        );
        expect(screen.getByTestId("otherGuest User1")).toHaveTextContent(
            "Christian"
        );
    });
    test("Testing sort by Touchdowns", () => {
        //We use the same component to display the super and user sort, the second one is the user sort
        //const sortButton = screen.queryAllByLabelText(/Sort Options/)[1];
        expect(screen.queryAllByTestId("sort")).toHaveLength(2);
        const sortButton = screen.queryAllByTestId("sort")[1];
        userEvent.selectOptions(sortButton, "Touchdowns");
        //Christian has 13 touchdowns while George has 11, so Christian rendered first
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "Christian"
        );
        expect(screen.getByTestId("otherGuest User1")).toHaveTextContent(
            "George"
        );
    });
    test("Testing sort by none after sorting previously, should keep same rendering order", () => {
        //We use the same component to display the super and user sort, the second one is the user sort
        //const sortButton = screen.queryAllByLabelText(/Sort Options/)[1];
        expect(screen.queryAllByTestId("sort")).toHaveLength(2);
        const sortButton = screen.queryAllByTestId("sort")[1];
        userEvent.selectOptions(sortButton, "Rating");
        //George has a higher rating than Christian, so now he will be rendered first
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "George"
        );
        expect(screen.getByTestId("otherGuest User1")).toHaveTextContent(
            "Christian"
        );
        userEvent.selectOptions(sortButton, "None");
        expect(screen.getByTestId("otherGuest User0")).toHaveTextContent(
            "George"
        );
        expect(screen.getByTestId("otherGuest User1")).toHaveTextContent(
            "Christian"
        );
    });
});
