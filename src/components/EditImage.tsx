import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../style.css";
import { Player } from "../interfaces/player";
interface Edit {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
}
export function EditImage({ player, widgets, setWidgets }: Edit): JSX.Element {
    // This is the Control
    const [image, setImage] = useState<string>(player.image);

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }

    function updateImage(event: React.ChangeEvent<HTMLInputElement>) {
        setImage(event.target.value);
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
        const widgetList = widgets;
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            image: event.target.value
        });
        console.log(widgetList);
        setWidgets([...widgetList]);
    }
    // This is the View
    return (
        <div className="editText">
            <Form.Group data-testid="usertext" controlId="UserTextBox">
                <Form.Control value={image} onChange={updateImage} />
            </Form.Group>
        </div>
    );
}
