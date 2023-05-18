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
        //edit's the rating of the player with the rating of the user's choosing
        if (
            (parseInt(event.target.value) >= 0 &&
                parseInt(event.target.value) <= 100) ||
            isNaN(parseInt(event.target.value))
        ) {
            setRating(parseInt(event.target.value) || 0);
            {
                /*}
            console.log(event.target.value);
            console.log("Player index is" + getPlayerIndex());
            {*/
            }

            const widgetList = widgets;
            widgetList.splice(getPlayerIndex(), 1, {
                ...player,
                rating: parseInt(event.target.value) || 0
            });
            {
                /*}console.log(widgetList);{*/
            }
            setWidgets([...widgetList]);
        }
    }
    //Form used to take in user input to pass through update function
    return (
        <div>
            <Form.Group className="editNums" controlId="RatingBox">
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
