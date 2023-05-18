import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
describe("Filtering players by description search, in central", () => {
    test("Testing original 30 player list is present", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing filtering by empty string", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        const searchDesc = screen.getByLabelText(
            "Central Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "");
        expect(searchDesc).toHaveValue("");
        // Nothing is filtered out
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing filtering by San Francisco", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        const searchDesc = screen.getByLabelText(
            "Central Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "San Francisco");
        expect(searchDesc).toHaveValue("San Francisco");
        //There are only 3 people on San Francisco team
        expect(screen.getByText(/player count in the central list is: 3/));
    });
    test("Testing filtering by Bengals", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        const searchDesc = screen.getByLabelText(
            "Central Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "Bengals");
        expect(searchDesc).toHaveValue("Bengals");
        //There are only 4 people on Cincinnati Bengals
        expect(screen.getByText(/player count in the central list is: 4/));
    });
    test("Testing filtering by York", () => {
        render(<App />);
        expect(screen.getByTestId(0)).toBeInTheDocument();
        const searchDesc = screen.getByLabelText(
            "Central Description Filter:",
            {}
        );

        userEvent.type(searchDesc, "York");
        expect(searchDesc).toHaveValue("York");
        //There are only 3 people on the New York Giants
        expect(screen.getByText(/player count in the central list is: 3/));
    });
});
