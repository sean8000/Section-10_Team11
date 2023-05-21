import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Adding players", () => {
    test("Testing for original 30 player list, and that league manager can add players", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
        expect(screen.getByText(/Add Players Here/)).toBeInTheDocument();
    });
    test("Testing for adding 1 player, see if name exists in list", () => {
        render(<App />);
        const playerName = screen.getByLabelText(/Player Name:/i);
        userEvent.type(playerName, "Justin Korup");
        const playerDescription = screen.getByLabelText(/Player Description:/i);
        userEvent.type(playerDescription, "Newest Player");
        const playerURL = screen.getByLabelText(/Image URL:/i);
        userEvent.type(playerURL, "https://12345");
        const playerPosition = screen.getByLabelText(/Which Position/i);
        userEvent.selectOptions(playerPosition, "K");
        const addPlayerButton = screen.getByTestId("addPlayer");
        addPlayerButton.click();

        //Justin Korup is in the player list displayed on the screen
        expect(screen.getByText(/Justin Korup/i));
    });

    test("Testing for adding 1 player, see if list increased in size", () => {
        render(<App />);
        const playerName = screen.getByLabelText(/Player Name:/i);
        userEvent.type(playerName, "Justin Korup");
        const playerDescription = screen.getByLabelText(/Player Description:/i);
        userEvent.type(playerDescription, "Newest Player");
        const playerURL = screen.getByLabelText(/Image URL:/i);
        userEvent.type(playerURL, "https://12345");
        const playerPosition = screen.getByLabelText(/Which Position/i);
        userEvent.selectOptions(playerPosition, "K");
        const addPlayerButton = screen.getByTestId("addPlayer");
        addPlayerButton.click();

        //An increase of 1
        expect(screen.getAllByText(/player count in the central list is: 31/));
    });
    test("Test adding player doesn't appear when not league manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );
        expect(screen.queryByText(/Add Players Here/)).toBeNull();
    });
    test("Test adding player doesn't appear when not league manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Role Select")).toHaveValue("Guest User");
        expect(screen.queryByText(/Add Players Here/)).toBeNull();
    });
});
