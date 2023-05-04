import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

//NEED TO ADD MORE DRAG TESTS
//Testing Role
describe("Role Tests", () => {
    test("Tests that there is a combobox", () => {
        render(<App />);
        expect(screen.queryAllByRole("combobox"));
    });
    test("Tests that the first role value is League Manager", () => {
        render(<App />);
        expect(screen.getByLabelText("Which role")).toHaveValue(
            "League Manager"
        );
    });
    test("Tests that the changed value is Team Manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
    });
    test("Tests that the changed value is Guest User", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
    });
    test("Test adding user", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        const nameElement = screen.getByLabelText(/User Name/i);
        userEvent.type(nameElement, "myName");
        expect(nameElement).toHaveValue("myName");
        const addButton = screen.getByTestId("addButton");
        addButton.click();
        userEvent.selectOptions(selectRole, "myName");
        expect(screen.getByLabelText("Which role")).toHaveValue("myName");
    });
});

//Testing Drag
describe("Drag Tests", () => {
    test("Testing for original 30 player list", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing that draggable list doesn't exist when league manager", () => {
        render(<App />);
        expect(screen.queryByText(/Your Team/)).not.toBeInTheDocument;
    });
    test("Testing that draggable list appears when not league manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
        expect(screen.getByText(/Your Team/)).toBeInTheDocument;
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
        expect(screen.getByText(/Your Team/)).toBeInTheDocument;
    });
    test("Testing that first player is draggable", () => {
        render(<App />);
        const firstListIndex = screen.getByTestId(0);
        expect(firstListIndex.draggable).toBe(true);
    });
    test("Testing that first player can be dragged to other list", () => {
        render(<App />);
        const firstListIndex = screen.getByTestId(0);
        expect(firstListIndex.draggable).toBe(true);
        //expect(firstListIndex.ondrop())
    });
});

//Testing addPlayers
describe("Testing Adding players", () => {
    test("Testing for original 30 player list, and that league manager can add players", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
        expect(screen.getByText(/Add This New Player:/)).toBeInTheDocument;
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
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Which role")).toHaveValue("Team Manager");
        expect(screen.queryByText(/Add This New Player:/)).not
            .toBeInTheDocument;
    });
    test("Test adding player doesn't appear when not league manager", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Which role", {});
        userEvent.selectOptions(selectRole, "Guest User");
        expect(screen.getByLabelText("Which role")).toHaveValue("Guest User");
        expect(screen.queryByText(/Add This New Player:/)).not
            .toBeInTheDocument;
    });
});

//Testing filter
describe("Testing Filter", () => {
    test("Testing for original 30 player list", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
        expect(screen.getByText(/Add This New Player:/)).toBeInTheDocument;
    });
    test("Testing no filter", () => {
        render(<App />);
        const noButton = screen.getByTestId("filter" + "None");
        expect(noButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 30/));
    });
    test("Testing for filtered by QB", () => {
        render(<App />);
        const qbButton = screen.getByTestId("filter" + "QB");
        expect(qbButton).not.toBeChecked;
        qbButton.click();
        expect(qbButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 QBs in the list
        //Add 2 because there is a QB radio button, and a combobox initially displaying QB.
        expect(screen.queryAllByText(/QB/i)).toHaveLength(4 + 2);
    });
    test("Testing for filtered by RB", () => {
        render(<App />);
        const rbButton = screen.getByTestId("filter" + "RB");
        expect(rbButton).not.toBeChecked;
        rbButton.click();
        expect(rbButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 9/));
        //Check if  9 RBs in the list
        //Add 2 because there is a RB radio button and a RB option.
        expect(screen.queryAllByText(/RB/i)).toHaveLength(9 + 2);
    });
    test("Testing for filtered by WR", () => {
        render(<App />);
        const wrButton = screen.getByTestId("filter" + "WR");
        expect(wrButton).not.toBeChecked;
        wrButton.click();
        expect(wrButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 9/));
        //Check if  9 WRs in the list
        //Add 2 because there is a WR radio button, and a WR option.
        expect(screen.queryAllByText(/WR/i)).toHaveLength(9 + 2);
    });
    test("Testing for filtered by TE", () => {
        render(<App />);
        const teButton = screen.getByTestId("filter" + "TE");
        expect(teButton).not.toBeChecked;
        teButton.click();
        expect(teButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 TEs in the list
        //Add 4 because there is a TE radio button, a TE option, and TEAM is written twice in the App text.
        expect(screen.queryAllByText(/TE/)).toHaveLength(4 + 4);
    });
    test("Testing for filtered by K", () => {
        render(<App />);
        const kButton = screen.getByTestId("filter" + "K");
        expect(kButton).not.toBeChecked;
        kButton.click();
        expect(kButton).toBeChecked;
        expect(screen.getByText(/player count in the central list is: 4/));
        //Check if  4 TEs in the list
        //Add 2 because there is a TE radio button, and a TE option.
        expect(screen.queryAllByText(/K/)).toHaveLength(4 + 2);
    });
});
describe("Testing Sort", () => {
    test("Testing for original 30 player list, and that league manager can add players", () => {
        render(<App />);
        expect(screen.getByText(/player count in the central list is: 30/));
        expect(screen.getByText(/Add This New Player:/)).toBeInTheDocument;
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
        const statsButton = screen.getByTestId("stats");
        statsButton.click();
        userEvent.selectOptions(sortID, "Touchdowns");
        //First person has 41, second 40, 8 has 13, 29(last) would be a -1 (has no touchdowns, placeholder)
        const firstRated = screen.getByTestId(0);
        expect(firstRated).toHaveTextContent("41");
        const SecondRated = screen.getByTestId(1);
        expect(SecondRated).toHaveTextContent("40");
        const eighteen = screen.getByTestId(8);
        expect(eighteen).toHaveTextContent("13");
        const last = screen.getByTestId(29);
        expect(last).toHaveTextContent("-1");
    });
    test("Test sorted by None", () => {
        //After the sort is changed back to none, it will retain the same ordering as the previous sort
        render(<App />);
        const sortID = screen.getByLabelText(/Sort Select/);
        const statsButton = screen.getByTestId("stats");
        statsButton.click();
        userEvent.selectOptions(sortID, "Touchdowns");
        //First person has 41, second 40, 8 has 13, 29(last) would be a -1 (has no touchdowns, placeholder)
        const firstRated = screen.getByTestId(0);
        expect(firstRated).toHaveTextContent("41");
        const SecondRated = screen.getByTestId(1);
        expect(SecondRated).toHaveTextContent("40");
        const eighteen = screen.getByTestId(8);
        expect(eighteen).toHaveTextContent("13");
        const last = screen.getByTestId(29);
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