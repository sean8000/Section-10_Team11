import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../style.css";
import { Player } from "../interfaces/player";
interface Edit {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
}
export function EditName({ player, widgets, setWidgets }: Edit): JSX.Element {
    // This is the Control
    const [name, setName] = useState<string>(player.name);

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
        const widgetList = widgets;
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            name: event.target.value
        });
        console.log(widgetList);
        setWidgets([...widgetList]);
    }
    // This is the View
    return (
        <div className="editText">
            <Form.Group data-testid="usertext" controlId="UserTextBox">
                <Form.Control value={name} onChange={updateName} />
            </Form.Group>
        </div>
    );
}
