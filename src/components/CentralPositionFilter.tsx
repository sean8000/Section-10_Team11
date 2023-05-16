import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";
import "../style.css";
//import { playerList } from "../players";

//const allPlayers = playerList;

export interface Filter {
    filterPosition: string[];
    playerList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
}

export function CentralPositionFilter({
    filterPosition,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    playerList,
    setFilteredList
}: Filter): JSX.Element {
    const [filter, setFilter] = useState<string>("None");

    function updateFilter(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value);
        if (
            event.target.value !== "None" &&
            event.target.value !== "Rating > 90"
        ) {
            const tempPlayerList = playerList.filter(
                (player: Player): boolean =>
                    player.position === event.target.value
            );
            setFilteredList(tempPlayerList);
        } else if (event.target.value === "Rating > 90") {
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.rating >= 90
            );
            setFilteredList(tempPlayerList);
        } else {
            setFilteredList(playerList);
        }
    }

    return (
        <div className="positionFilter">
            <Form.Group>
                <Form.Label style={{ color: "white" }}>
                    Filter Buttons
                </Form.Label>
                <br></br>
                {filterPosition.map((choice: string) => (
                    <Form.Check
                        style={{ color: "white" }}
                        inline
                        type="radio"
                        name="central-positions"
                        onChange={updateFilter}
                        key={choice}
                        label={choice}
                        value={choice}
                        checked={choice === filter}
                        data-testid={"filter" + choice}
                    />
                ))}
            </Form.Group>
        </div>
    );
}

export default CentralPositionFilter;
