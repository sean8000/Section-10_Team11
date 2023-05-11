//import { Player, Position } from "../interfaces/player";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { Player } from "../../interfaces/player";
import "./edit.css";

interface Rating {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
}

export function EditRating({ widgets, setWidgets, player }: Rating) {
    //Stats all automatically 1, rating automatically 1 considering they're a new player
    const [rating, setRating] = useState<number>(player.rating);
    // Provide forms for editing the new movie
    // And also a button to append the movie

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }
    function updateNumber(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            parseInt(event.target.value) >= 0 &&
            parseInt(event.target.value) <= 100
        ) {
            setRating(parseInt(event.target.value) || 0);
            console.log(event.target.value);
            console.log("Player index is" + getPlayerIndex());
            const widgetList = widgets;
            widgetList.splice(getPlayerIndex(), 1, {
                ...player,
                rating: parseInt(event.target.value)
            });
            console.log(widgetList);
            setWidgets([...widgetList]);
        }
    }

    return (
        <div>
            <Form.Group
                data-testid={"rating" + getPlayerIndex()}
                className="editNums"
                controlId="PlayerRating"
            >
                <Form.Label>Rating</Form.Label>
                <Form.Control
                    type="number"
                    value={rating}
                    onChange={updateNumber}
                />
            </Form.Group>
        </div>
    );
}
