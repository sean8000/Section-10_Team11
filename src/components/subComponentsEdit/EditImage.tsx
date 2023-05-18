import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./edit.css";
import { Player } from "../../interfaces/player";
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
        //edits the image of the player with the image of the user's choosing
        setImage(event.target.value);
        {
            /*}
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
    {*/
        }
        const widgetList = widgets;
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            image: event.target.value
        });

        {
            /*}console.log(widgetList);{*/
        }
        setWidgets([...widgetList]);
    }
    // This is the View
    //Form used to take in user input to pass through update function
    return (
        <div className="editText">
            <Form.Group controlId="ImageBox">
                <Form.Label>Image</Form.Label>
                <Form.Control value={image} onChange={updateImage} />
            </Form.Group>
        </div>
    );
}
