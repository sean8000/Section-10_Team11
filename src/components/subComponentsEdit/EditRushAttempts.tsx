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

export function EditRushAttempts({ widgets, setWidgets, player }: Rating) {
    //Stats all automatically 1, rushAttempts automatically 1 considering they're a new player
    const [rushAttempts, setRushAttempts] = useState<number>(
        player.stats.rushAttempts
    );
    // Provide forms for editing the new movie
    // And also a button to append the movie

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }
    function updateRushAttempts(event: React.ChangeEvent<HTMLInputElement>) {
        setRushAttempts(parseInt(event.target.value) || 0);
        console.log(event.target.value);
        console.log("Player index is" + getPlayerIndex());
        const widgetList = widgets;
        const newStats = {
            ...player.stats,
            rushAttempts: parseInt(event.target.value) || 0
        };
        widgetList.splice(getPlayerIndex(), 1, {
            ...player,
            stats: newStats
        });
        console.log(widgetList);
        setWidgets([...widgetList]);
    }

    return (
        <div>
            <Form.Group className="editNums" controlId="RushAttemptsBox">
                <Form.Label>Rush Attempts</Form.Label>
                <Form.Control
                    data-testid={"rushAttempts" + getPlayerIndex()}
                    type="number"
                    value={rushAttempts}
                    onChange={updateRushAttempts}
                />
            </Form.Group>
        </div>
    );
}
