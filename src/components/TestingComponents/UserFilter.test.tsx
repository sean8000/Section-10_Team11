import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Filter in central list", () => {
    beforeEach(() => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        expect(screen.getByTestId(1)).toBeInTheDocument();

        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");

        const addFirstPlayerButton = screen.getByTestId("userButton" + 0);
        const addSecondPlayerButton = screen.getByTestId("userButton" + 1);

        addFirstPlayerButton.click();
        addSecondPlayerButton.click();
        //Now Added player is in the other list, index 0 in the draggable list
    });

    test("Testing no filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const noButton = screen.queryAllByTestId("filter" + "None")[1];
        expect(noButton).toBeChecked();
        //Both are now in the user list, with a filter of none both are displayed
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(2);
        expect(screen.queryAllByText(/George/i)).toHaveLength(2);
    });
    test("Testing QB filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const qbButton = screen.queryAllByTestId("filter" + "QB")[1];
        expect(qbButton).not.toBeChecked();
        qbButton.click();
        //Neither are qb, so neither are displayed on the user side
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(1);
        expect(screen.queryAllByText(/George/i)).toHaveLength(1);
    });
    test("Testing RB filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const rbButton = screen.queryAllByTestId("filter" + "RB")[1];
        expect(rbButton).not.toBeChecked();
        rbButton.click();
        //Christian is a RB, George is not
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(2);
        expect(screen.queryAllByText(/George/i)).toHaveLength(1);
    });
    test("Testing WR filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const wrButton = screen.queryAllByTestId("filter" + "WR")[1];
        expect(wrButton).not.toBeChecked();
        wrButton.click();
        //Neither are WR
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(1);
        expect(screen.queryAllByText(/George/i)).toHaveLength(1);
    });
    test("Testing TE filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const teButton = screen.queryAllByTestId("filter" + "TE")[1];
        expect(teButton).not.toBeChecked();
        teButton.click();
        //George is a TE, Christian is not
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(1);
        expect(screen.queryAllByText(/George/i)).toHaveLength(2);
    });
    test("Testing K filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const kButton = screen.queryAllByTestId("filter" + "K")[1];
        expect(kButton).not.toBeChecked();
        kButton.click();
        //Neither are kickers
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(1);
        expect(screen.queryAllByText(/George/i)).toHaveLength(1);
    });
    test("Testing Rating filter", () => {
        //We use the same component to display the super and user filter, the second filter is the user's filter
        const ratingButton = screen.queryAllByTestId(
            "filter" + "Rating > 90"
        )[1];
        expect(ratingButton).not.toBeChecked();
        ratingButton.click();
        //Both have ratings over 90
        expect(screen.queryAllByText(/Christian/i)).toHaveLength(2);
        expect(screen.queryAllByText(/George/i)).toHaveLength(2);
    });
});
