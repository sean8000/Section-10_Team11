import React, { useState } from "react";
import { Form } from "react-bootstrap";

const POSITIONS = ["QB", "RB", "WR", "TE", "K"];
const CHECKED = [false, false, false, false, false];

export function PositionFilter(): JSX.Element {
    const [isChecked, setIsCheckted] = useState<boolean[]>(CHECKED);

    function handleOnChange(position: number) {
        const updatedCheckedState = isChecked.map((item, index) =>
            index === position ? !item : item
        );
        setIsCheckted(updatedCheckedState);
        console.log(updatedCheckedState);
    }
    return (
        <div>
            {POSITIONS.map((position: string) => (
                <Form.Check
                    key={position}
                    value={position}
                    name={position}
                    label={position}
                    onChange={() => handleOnChange(POSITIONS.indexOf(position))}
                ></Form.Check>
            ))}
        </div>
    );
}

export default PositionFilter;
