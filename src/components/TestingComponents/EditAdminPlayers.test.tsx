import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Testing Edit Players From Admin", () => {
    test("Testing That this object doesn't exist in the edit list if not placed there by user", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );

        const editButton = screen.getByTestId("Team ManagerEditButton");
        editButton.click();

        expect(screen.queryByTestId("otherTeam Manager0")).toBeNull();
    });
    test("Testing That Player can be added and then displayed after in the edit component", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );

        const addFirstPlayerButton = screen.getByTestId("adminButton" + 0);
        expect(screen.queryByTestId("otherTeam Manager0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Team ManagerEditButton");
        editButton.click();
        //This is the testid to the div of the rendered player component in edit
        expect(screen.getByTestId("otherTeam Manager0")).toBeInTheDocument();
    });
    test("Testing That Player can be edited after the edit is clicked", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );

        const addFirstPlayerButton = screen.getByTestId("adminButton" + 0);
        expect(screen.queryByTestId("otherTeam Manager0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Team ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherTeam Manager0")).toBeInTheDocument();

        const changeName = screen.getByLabelText("Name");
        userEvent.type(changeName, "{selectall}{backspace}");
        userEvent.type(changeName, "NO");
        expect(changeName).toHaveValue("NO");
        //For the text in the box, and the name actually being rendered on the screen
        expect(screen.getByText(/NO/)).toBeInTheDocument();
    });

    test("Testing That Edited player is in central list after leaving edit mode", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );

        const addFirstPlayerButton = screen.getByTestId("adminButton" + 0);
        expect(screen.queryByTestId("otherTeam Manager0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Team ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherTeam Manager0")).toBeInTheDocument();

        const changeName = screen.getByLabelText("Name");
        userEvent.type(changeName, "{selectall}{backspace}");
        userEvent.type(changeName, "RickGrimes");
        expect(changeName).toHaveValue("RickGrimes");
        //For the text now displayed to the screen
        expect(screen.getByText(/RickGrimes/)).toBeInTheDocument();
        const leaveButton = screen.getByTestId("Team ManagerLeaveEditButton");
        leaveButton.click();
        //For the Sean rendered in the central list and the sean rendered in the admin list
        expect(screen.queryAllByText(/RickGrimes/)).toHaveLength(2);
    });
    test("Testing every field and returning to central list to check if changed", () => {
        render(<App />);
        const selectRole = screen.getByLabelText("Role Select", {});
        userEvent.selectOptions(selectRole, "Team Manager");
        expect(screen.getByLabelText("Role Select")).toHaveValue(
            "Team Manager"
        );

        const addFirstPlayerButton = screen.getByTestId("adminButton" + 0);
        expect(screen.queryByTestId("otherTeam Manager0")).toBeNull();
        addFirstPlayerButton.click();

        const editButton = screen.getByTestId("Team ManagerEditButton");
        editButton.click();

        expect(screen.getByTestId("otherTeam Manager0")).toBeInTheDocument();

        const changeName = screen.getByLabelText("Name");
        userEvent.type(changeName, "{selectall}{backspace}");
        userEvent.type(changeName, "RickGrimes");
        expect(changeName).toHaveValue("RickGrimes");
        //For the text now displayed to the screen

        const changeDesc = screen.getByLabelText("Description");
        userEvent.type(changeDesc, "{selectall}{backspace}");
        userEvent.type(changeDesc, "The Walking Dead");
        expect(changeDesc).toHaveValue("The Walking Dead");

        const changeImage = screen.getByLabelText("Image");
        userEvent.type(changeImage, "{selectall}{backspace}");
        userEvent.type(changeImage, "https://");
        expect(changeImage).toHaveValue("https://");

        const changePosition = screen.getByLabelText("Position");
        userEvent.selectOptions(changePosition, "TE");
        expect(changePosition).toHaveValue("TE");

        const changeTouchdowns = screen.getByLabelText("Touchdowns");
        userEvent.type(changeTouchdowns, "{selectall}{backspace}");
        userEvent.type(changeTouchdowns, "1");

        const changeReceptions = screen.getByLabelText("Receptions");
        userEvent.type(changeReceptions, "{selectall}{backspace}");
        userEvent.type(changeReceptions, "2");

        const changeRushAttempts = screen.getByLabelText("Rush Attempts");
        userEvent.type(changeRushAttempts, "{selectall}{backspace}");
        userEvent.type(changeRushAttempts, "3");

        const changeTotalYards = screen.getByLabelText("Total Yards");
        userEvent.type(changeTotalYards, "{selectall}{backspace}");
        userEvent.type(changeTotalYards, "4");

        const changeRating = screen.getByLabelText("Rating");
        userEvent.type(changeRating, "{backspace}5{arrowleft}{backspace}");
        expect(changeRating).toHaveValue(5);

        const leaveButton = screen.getByTestId("Team ManagerLeaveEditButton");
        leaveButton.click();
        //For the RickGrimes rendered in the central list and the sean rendered in the admin list
        const statsButtonSuper1 = screen.getByTestId("statsButtonSuper0");
        statsButtonSuper1.click();
        //Show stats

        expect(screen.queryAllByText(/RickGrimes/)).toHaveLength(2);
        expect(screen.getByText(/The Walking Dead/));
        //Can't test for image change because all of our images have the same alt text
        //expect(screen.queryAllByAltText(/Image/)).toHaveLength(31);
        //4 TE in central list originally, + 1 we changed in central list, +1 in admin widget list
        //+ 1 for the filter option
        expect(screen.queryAllByText(/TE/)).toHaveLength(7);
        expect(screen.queryAllByText(/Overall: 5/)).toHaveLength(2);
        expect(screen.getByText(/Touchdowns: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Receptions: 2/)).toBeInTheDocument();
        expect(screen.getByText(/Rush Attempts: 3/)).toBeInTheDocument();
        expect(screen.getByText(/Yards: 4/)).toBeInTheDocument();
    });
});
