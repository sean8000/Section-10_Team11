import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";
import { playerList } from "../players";

const allPlayers = playerList;

export interface Filter {
    filterPosition: string[];
    filterBoolean: boolean[];
    playerList: Player[];
    setPlayerList: (newPlayerList: Player[]) => void;
}

export function PositionFilter({
    filterPosition,
    filterBoolean,
    playerList,
    setPlayerList
}: Filter): JSX.Element {
    const [isChecked, setIsCheckted] = useState<boolean[]>(filterBoolean);

    function handleOnChange(position: number) {
        const updatedCheckedState = isChecked.map(
            (item: boolean, index: number) =>
                index === position ? !item : item
        );

        setIsCheckted(updatedCheckedState);

        let tempPlayerList = playerList.map(
            (player: Player): Player => ({ ...player })
        );

        if (updatedCheckedState[0] === true) {
            if (tempPlayerList.length === 0) {
                tempPlayerList = allPlayers.filter(
                    (player: Player): boolean => player.position === "QB"
                );
            }
            // tempPlayerList = allPlayers.filter(
            //     (player: Player): boolean => player.position === "QB"
            // );

            // setPlayerList(tempPlayerList);
            // console.log("temp list: " + tempPlayerList);
            // console.log("player list: " + playerList);
        }

        if (updatedCheckedState[1] === true) {
            tempPlayerList = allPlayers.filter(
                (player: Player): boolean => player.position === "RB"
            );

            setPlayerList(tempPlayerList);
            console.log("temp list: " + tempPlayerList);
            console.log("player list: " + playerList);
        }

        const everyFalse = updatedCheckedState.every(
            (bool: boolean): boolean => bool === false
        );

        if (everyFalse === true) {
            console.log("t: " + tempPlayerList);
            console.log("p: " + playerList);
            console.log("all false");
            setPlayerList(allPlayers);
        }

        //console.log("everyFalse: " + everyFalse);
        //console.log(tempPlayerList);
        //console.log("updatedCheckedState: " + updatedCheckedState);
    }
    return (
        <div>
            {filterPosition.map((position: string) => (
                <Form.Check
                    key={position}
                    value={position}
                    name={position}
                    label={position}
                    onChange={() =>
                        handleOnChange(filterPosition.indexOf(position))
                    }
                ></Form.Check>
            ))}
        </div>
    );
}

export default PositionFilter;
