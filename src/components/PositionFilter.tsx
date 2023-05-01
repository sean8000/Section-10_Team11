import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";
import { playerList } from "../players";

const allPlayers = playerList;

export interface Filter {
    filterPosition: string[];
    playerList: Player[];
    setPlayerList: (newPlayerList: Player[]) => void;
}

export function PositionFilter({
    filterPosition,
    playerList,
    setPlayerList
}: Filter): JSX.Element {
    const [filter, setFilter] = useState<string>("None");

    function updateFilter(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value);
        setPlayerList(allPlayers);

        if (event.target.value === "QB") {
            setPlayerList(allPlayers);
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.position === "QB"
            );
            setPlayerList(tempPlayerList);
        }
        if (event.target.value === "RB") {
            setPlayerList(allPlayers);
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.position === "RB"
            );
            setPlayerList(tempPlayerList);
        }
        if (event.target.value === "WR") {
            setPlayerList(allPlayers);
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.position === "WR"
            );
            setPlayerList(tempPlayerList);
        }
        if (event.target.value === "TE") {
            setPlayerList(allPlayers);
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.position === "TE"
            );
            setPlayerList(tempPlayerList);
        }
        if (event.target.value === "K") {
            setPlayerList(allPlayers);
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.position === "K"
            );
            setPlayerList(tempPlayerList);
        }
        if (event.target.value === "None") {
            setPlayerList(allPlayers);
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
                />
            ))}
        </div>
    );
}

export default PositionFilter;
