import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
//import userEvent from "@testing-library/user-event";

describe("Testing Filter in central list", () => {
    test("Testing for original 30 player list", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
        expect(screen.getByText(/Add Players Here/)).toBeInTheDocument();
    });
    test("Testing no filter", () => {
        render(<App />);
        const noButton = screen.getByTestId("filter" + "None");
        expect(noButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing for filtered by QB", () => {
        render(<App />);
        const qbButton = screen.getByTestId("filter" + "QB");
        expect(qbButton).not.toBeChecked();
        qbButton.click();
        expect(qbButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 QBs in the list
        //Add 2 because there is a QB radio button, and a combobox initially displaying QB, QB option in add player.
        expect(screen.queryAllByText(/QB/i)).toHaveLength(4 + 3);
    });
    test("Testing for filtered by RB", () => {
        render(<App />);
        const rbButton = screen.getByTestId("filter" + "RB");
        expect(rbButton).not.toBeChecked();
        rbButton.click();
        expect(rbButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 9/));
        //Check if  9 RBs in the list
        //Add 2 because there is a RB radio button and a RB option.
        expect(screen.queryAllByText(/RB/i)).toHaveLength(9 + 2);
    });
    test("Testing for filtered by WR", () => {
        render(<App />);
        const wrButton = screen.getByTestId("filter" + "WR");
        expect(wrButton).not.toBeChecked();
        wrButton.click();
        expect(wrButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 9/));
        //Check if  9 WRs in the list
        //Add 2 because there is a WR radio button, and a WR option.
        expect(screen.queryAllByText(/WR/i)).toHaveLength(9 + 2);
    });
    test("Testing for filtered by TE", () => {
        render(<App />);
        const teButton = screen.getByTestId("filter" + "TE");
        expect(teButton).not.toBeChecked();
        teButton.click();
        expect(teButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 TEs in the list
        //Add 2 because there is a TE radio button, a TE option.
        expect(screen.queryAllByText(/TE/)).toHaveLength(4 + 2);
    });
    test("Testing for filtered by K", () => {
        render(<App />);
        const kButton = screen.getByTestId("filter" + "K");
        expect(kButton).not.toBeChecked();
        kButton.click();
        expect(kButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 TEs in the list
        //Add 2 because there is a TE radio button, and a TE option.
        expect(screen.queryAllByText(/K/)).toHaveLength(4 + 2);
    });
    test("Testing for filtered by Rating", () => {
        render(<App />);
        const kButton = screen.getByTestId("filter" + "Rating > 90");
        expect(kButton).not.toBeChecked();
        kButton.click();
        expect(kButton).toBeChecked();
        expect(screen.getByText(/player count in the central list is: 25/));
        //25 people over 90 in our list
        //Add 1 because there is a Rating > 90 radio button
        expect(screen.queryAllByText(/9/)).toHaveLength(26);
    });
});
