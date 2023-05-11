import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../style.css";
import { Player, Position } from "../../interfaces/player";
interface Edit {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
}
export function EditPosition({
    player,
    widgets,
    setWidgets
}: Edit): JSX.Element {
    // This is the Control
    const [pos, setPos] = useState<string>(player.position);
    const OPTIONS = ["QB", "RB", "WR", "TE", "K"];

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }

    function updatePos(event: React.ChangeEvent<HTMLSelectElement>) {
        setPos(event.target.value);
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
        const widgetList = widgets;
        const newPos = event.target.value as Position;
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            position: newPos
        });
        console.log(widgetList);
        setWidgets([...widgetList]);
    }
    // This is the View
    return (
        <div className="editText">
            <Form.Group
                data-testid={"position" + getPlayerIndex()}
                controlId="Roles"
            >
                <Form.Label>Position</Form.Label>
                <Form.Select value={pos} onChange={updatePos}>
                    {OPTIONS.map((pos: string) => (
                        <option key={pos} value={pos}>
                            {[pos]}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
