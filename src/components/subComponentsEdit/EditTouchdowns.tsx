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

export function EditTouchdowns({ widgets, setWidgets, player }: Rating) {
    //Stats all automatically 1, touchdowns automatically 1 considering they're a new player
    const [touchdowns, setTouchdowns] = useState<number>(
        player.stats.touchdowns
    );
    // Provide forms for editing the new movie
    // And also a button to append the movie

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }
    function updateTouchdowns(event: React.ChangeEvent<HTMLInputElement>) {
        //edits the players total touchdowns
        if (
            parseInt(event.target.value) >= 0 ||
            isNaN(parseInt(event.target.value))
        ) {
            setTouchdowns(parseInt(event.target.value) || 0);
        }
        {
            /*}
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
        {*/
        }
        const widgetList = widgets;
        const newStats = {
            ...player.stats,
            touchdowns: parseInt(event.target.value) || 0
        };
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            stats: newStats
        });
        {
            /*}console.log(widgetList);{*/
        }
        setWidgets([...widgetList]);
    }
    //Form used to take in user input to pass through update function

    return (
        <div>
            <Form.Group className="editNums" controlId="TouchdownsBox">
                <Form.Label>Touchdowns</Form.Label>
                <Form.Control
                    type="number"
                    value={touchdowns}
                    onChange={updateTouchdowns}
                />
            </Form.Group>
        </div>
    );
}
