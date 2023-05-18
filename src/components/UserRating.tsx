import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { Player } from "../interfaces/player";
import "../style.css";

interface Rating {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
    userFilteredList: Player[];
    setUserFilteredList: (newPlayerList: Player[]) => void;
}

export function UserRating({
    widgets,
    setWidgets,
    player,
    userFilteredList,
    setUserFilteredList
}: Rating) {
    //Stats all automatically 1, rating automatically 1 considering they're a new player
    const [rating, setRating] = useState<number>(player.rating);
    // Provide forms for editing the new movie
    // And also a button to append the movie

    function getPlayerIndex() {
        console.log("widget index: " + widgets.indexOf(player));
        return widgets.indexOf(player);
    }
    function getPlayerFilteredIndex() {
        console.log("userFiltered index: " + userFilteredList.indexOf(player));
        return userFilteredList.indexOf(player);
    }
    function updateNumber(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            parseInt(event.target.value) >= 0 &&
            parseInt(event.target.value) <= 100
        ) {
            setRating(parseInt(event.target.value) || 0);
            const newPlayer = {
                ...player,
                rating: parseInt(event.target.value)
            };
            const widgetList = widgets;
            widgetList.splice(getPlayerIndex(), 1, newPlayer);
            const widgetFilteredList = userFilteredList;
            widgetFilteredList.splice(getPlayerFilteredIndex(), 1, newPlayer);
            console.log(widgetList);
            setWidgets([...widgetList]);
            setUserFilteredList([...widgetFilteredList]);
        }
    }

    return (
        <div>
            <Form.Group className="playerRatingBox" controlId="PlayerRating">
                <Form.Label
                    style={{ color: "white", float: "left", fontSize: 14 }}
                >
                    Rating Box
                </Form.Label>
                <Form.Control
                    type="number"
                    value={rating}
                    onChange={updateNumber}
                />
            </Form.Group>
        </div>
    );
}
