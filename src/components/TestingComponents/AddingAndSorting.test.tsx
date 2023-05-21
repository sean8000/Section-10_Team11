import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing adding players with sort", () => {
    test("Testing for original 30 player list", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing for adding player, sort is none", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
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

        const sortID = screen.getByLabelText(/Sort Options/);
        userEvent.selectOptions(sortID, "None");

        const addedLast = screen.getByTestId(30);
        expect(addedLast).toHaveTextContent("K"); // since he's a kicker
    });
    test("Testing for adding player, sort is Position", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
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

        const sortID = screen.getByLabelText(/Sort Options/);
        userEvent.selectOptions(sortID, "Position");

        const addedLast = screen.getByTestId(4); //He would be index 4, 5th place in the list
        //since he was a kicker added last, so every other kicker is rendered before him
        expect(addedLast).toHaveTextContent("K"); // since he's a kicker
    });
    test("Testing for adding player, sort is Rating", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
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

        const sortID = screen.getByLabelText(/Sort Options/);
        userEvent.selectOptions(sortID, "Rating");

        const addedLast = screen.getByTestId(30); //He would be index  last since rating is 1
        expect(addedLast).toHaveTextContent("K"); // since he's a kicker
    });
    test("Testing for adding player, sort is Touchdowns", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
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

        const sortID = screen.getByLabelText(/Sort Options/);
        userEvent.selectOptions(sortID, "Touchdowns");

        const addedLast = screen.getByTestId(26); //He would be index 26, he has the least touchdowns
        //besides the kickers with -1
        //since he was a kicker added last, so every other kicker is rendered before him
        expect(addedLast).toHaveTextContent("K"); // since he's a kicker
    });
});
