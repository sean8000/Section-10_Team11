import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";
//import { playerList } from "../players";

//const allPlayers = playerList;

export interface Filter {
    filterPosition: string[];
    playerList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
}

export function PositionFilter({
    filterPosition,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    playerList,
    setFilteredList
}: Filter): JSX.Element {
    const [filter, setFilter] = useState<string>("None");

    function updateFilter(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value);
        if (event.target.value !== "None") {
            const tempPlayerList = playerList.filter(
                (player: Player): boolean =>
                    player.position === event.target.value
            );
            setFilteredList(tempPlayerList);
        } else {
            setFilteredList(playerList);
        }
    }

    return (
        <div>
            {filterPosition.map((choice: string) => (
                <Form.Check
                    inline
                    type="radio"
                    name="positions"
                    onChange={updateFilter}
                    key={choice}
                    label={choice}
                    value={choice}
                    checked={choice === filter}
                    data-testid={"filter" + choice}
                />
            ))}
        </div>
    );
}

export default PositionFilter;
