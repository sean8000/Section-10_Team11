import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";

export interface Filter {
    filterPosition: string[];
    playerList: Player[];
    setPlayerList: (newPlayerList: Player[]) => void;
    setPosition: (newPosition: string) => void;
}

export function PositionFilter({
    filterPosition,
    playerList,
    setPosition
}: Filter): JSX.Element {
    const [filter, setFilter] = useState<string>("None");

    function updateFilter(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value);
        //setPlayerList(allPlayers);
        console.log(filter);
        console.log(playerList);
        setPosition(event.target.value);
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
                />
            ))}
        </div>
    );
}

export default PositionFilter;
