import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";

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

        let tempPlayerList = playerList;
        if (filterBoolean[0] === true) {
            tempPlayerList = tempPlayerList.filter(
                (player: Player): boolean => player.position === "QB"
            );
            console.log(tempPlayerList);
        }

        setPlayerList(tempPlayerList);
        console.log(tempPlayerList);
        console.log(updatedCheckedState);
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
