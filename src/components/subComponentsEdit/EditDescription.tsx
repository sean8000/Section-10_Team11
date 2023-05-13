import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../style.css";
import { Player } from "../../interfaces/player";
interface Edit {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
}
export function EditDescription({
    player,
    widgets,
    setWidgets
}: Edit): JSX.Element {
    // This is the Control
    const [desc, setDesc] = useState<string>(player.description);

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }

    function updateDesc(event: React.ChangeEvent<HTMLInputElement>) {
        setDesc(event.target.value);
        {
            /*}
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
    {*/
        }
        const widgetList = widgets;
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            description: event.target.value
        });
        {
            /*}console.log(widgetList);{*/
        }
        setWidgets([...widgetList]);
    }
    // This is the View
    return (
        <div className="editText">
            <Form.Group controlId="DescriptionBox">
                <Form.Label>Description</Form.Label>
                <Form.Control value={desc} onChange={updateDesc} />
            </Form.Group>
        </div>
    );
}
