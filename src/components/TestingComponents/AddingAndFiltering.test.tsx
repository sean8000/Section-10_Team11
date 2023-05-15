import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing adding players with filter", () => {
    test("Testing for original 30 player list", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing for adding 1 player, filter is none", () => {
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
    test("Testing for adding 1 player, filter is K, player is a K", () => {
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

        const kButton = screen.getByTestId("filter" + "K");
        expect(kButton).not.toBeChecked;
        kButton.click();
        expect(kButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 5/));
        //Check if  4 Ks in the list +1 player added whos a K
        //Add 2 for K radio button, K option
        expect(screen.queryAllByText(/K/)).toHaveLength(7);
    });
    test("Testing for adding 1 player, filter is QB, player is a K", () => {
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

        const qbButton = screen.getByTestId("filter" + "QB");
        expect(qbButton).not.toBeChecked;
        qbButton.click();
        expect(qbButton).toBeChecked;
        //player not displayed since they're a K
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 QBs in the list +2 because of radio button and QB option, QB option in add player
        expect(screen.queryAllByText(/QB/i)).toHaveLength(4 + 3);
    });
});
