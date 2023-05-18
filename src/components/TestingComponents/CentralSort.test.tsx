import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Sort", () => {
    test("Testing for original 30 player list, and that league manager can add players", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
        expect(screen.getByText(/Add Players Here/)).toBeInTheDocument();
    });
    test("Testing for sorted by position", () => {
        render(<App />);
        const sortID = screen.getByLabelText(/Sort Select/);
        userEvent.selectOptions(sortID, "Position");
        //First person would be K, 4 would be a QB, 8 would be a RB, 17 would be a TE, 21 would be a WR
        const firstK = screen.getByTestId(0);
        expect(firstK).toHaveTextContent("K");
        const firstQB = screen.getByTestId(4);
        expect(firstQB).toHaveTextContent("QB");
        const firstRB = screen.getByTestId(8);
        expect(firstRB).toHaveTextContent("RB");
        const firstTE = screen.getByTestId(17);
        expect(firstTE).toHaveTextContent("TE");
        const firstWR = screen.getByTestId(21);
        expect(firstWR).toHaveTextContent("WR");
    });
    test("Test sorted by Rating", () => {
        render(<App />);
        const sortID = screen.getByLabelText(/Sort Select/);
        userEvent.selectOptions(sortID, "Rating");
        //First person would be 99, second a 99, 18 would be a 94, 29(last) would be an 86
        const firstRated = screen.getByTestId(0);
        expect(firstRated).toHaveTextContent("99");
        const SecondRated = screen.getByTestId(1);
        expect(SecondRated).toHaveTextContent("99");
        const eighteen = screen.getByTestId(17);
        expect(eighteen).toHaveTextContent("94");
        const last = screen.getByTestId(29);
        expect(last).toHaveTextContent("86");
    });
    test("Test sorted by Touchdowns", () => {
        render(<App />);
        const sortID = screen.getByLabelText(/Sort Select/);
        userEvent.selectOptions(sortID, "Touchdowns");
        //First person has 41, second 40, 8 has 13, 29(last) would be a -1 (has no touchdowns, placeholder)
        const firstRated = screen.getByTestId(0);
        const statsButtonSuper1 = screen.getByTestId("statsButtonSuper0");
        statsButtonSuper1.click();
        expect(firstRated).toHaveTextContent("41");
        const SecondRated = screen.getByTestId(1);
        const statsButtonSuper2 = screen.getByTestId("statsButtonSuper1");
        statsButtonSuper2.click();
        expect(SecondRated).toHaveTextContent("40");
        const eighteen = screen.getByTestId(8);
        const statsButtonSuper3 = screen.getByTestId("statsButtonSuper8");
        statsButtonSuper3.click();
        expect(eighteen).toHaveTextContent("13");
        const last = screen.getByTestId(29);
        const statsButtonSuper4 = screen.getByTestId("statsButtonSuper29");
        statsButtonSuper4.click();
        expect(last).toHaveTextContent("-1");
    });
    test("Test sorted by None", () => {
        //After the sort is changed back to none, it will retain the same ordering as the previous sort
        render(<App />);
        const sortID = screen.getByLabelText(/Sort Select/);
        userEvent.selectOptions(sortID, "Touchdowns");
        //First person has 41, second 40, 8 has 13, 29(last) would be a -1 (has no touchdowns, placeholder)
        const firstRated = screen.getByTestId(0);
        const statsButtonSuper1 = screen.getByTestId("statsButtonSuper0");
        statsButtonSuper1.click();
        expect(firstRated).toHaveTextContent("41");
        const SecondRated = screen.getByTestId(1);
        const statsButtonSuper2 = screen.getByTestId("statsButtonSuper1");
        statsButtonSuper2.click();
        expect(SecondRated).toHaveTextContent("40");
        const eighteen = screen.getByTestId(8);
        const statsButtonSuper3 = screen.getByTestId("statsButtonSuper8");
        statsButtonSuper3.click();
        expect(eighteen).toHaveTextContent("13");
        const last = screen.getByTestId(29);
        const statsButtonSuper4 = screen.getByTestId("statsButtonSuper29");
        statsButtonSuper4.click();
        expect(last).toHaveTextContent("-1");

        userEvent.selectOptions(sortID, "None");
        const otherFirstRated = screen.getByTestId(0);
        expect(otherFirstRated).toHaveTextContent("41");
        const otherSecondRated = screen.getByTestId(1);
        expect(otherSecondRated).toHaveTextContent("40");
        const otherEighteen = screen.getByTestId(8);
        expect(otherEighteen).toHaveTextContent("13");
        const otherLast = screen.getByTestId(29);
        expect(otherLast).toHaveTextContent("-1");
    });
});
