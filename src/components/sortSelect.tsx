import "../style.css";
import React from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";

export interface Sort {
    sortOption: string;
    setSortOption: (newString: string) => void;
    playerList: Player[];
    setPlayerList: (newPlayerList: Player[]) => void;
}

export function SortSelect({
    sortOption,
    setSortOption,
    playerList,
    setPlayerList
}: Sort): JSX.Element {
    const OPTIONS = ["None", "Position", "Rating", "Touchdowns"];

    function updateSort(event: React.ChangeEvent<HTMLSelectElement>) {
        const newSort = event.target.value;
        setSortOption(event.target.value);

        const tempPlayerList = playerList;

        // sorts list by whatever option is selected
        if (newSort === "None") {
            console.log("None");
            // Does nothing
        } else if (newSort === "Position") {
            console.log("Pos");
            tempPlayerList.sort((a, b) => (a.position < b.position ? -1 : 1));
        } else if (newSort === "Rating") {
            console.log("Rat");
            tempPlayerList.sort((a, b) => (a.rating > b.rating ? -1 : 1));
        } else if (newSort === "Touchdowns") {
            console.log("Touch");
            tempPlayerList.sort((a, b) =>
                a.stats.touchdowns > b.stats.touchdowns ? -1 : 1
            );
        }
        setPlayerList(tempPlayerList);
    }
    return (
        <div className="sortSelect">
            <Form.Group controlId="Sort">
                <Form.Label style={{ color: "white" }}>
                    Sort Options:
                </Form.Label>
                <Form.Select
                    data-testid="sort"
                    className="sortSelectHeading"
                    value={sortOption}
                    onChange={updateSort}
                >
                    {OPTIONS.map((OPTION: string) => (
                        <option key={OPTION} value={OPTION}>
                            {OPTION}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
