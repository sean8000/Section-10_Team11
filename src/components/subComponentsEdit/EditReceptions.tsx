//import { Player, Position } from "../interfaces/player";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { Player } from "../../interfaces/player";
import "../style.css";

interface Rating {
    player: Player;
    widgets: Player[];
    setWidgets: (newPlayerList: Player[]) => void;
}

export function EditReceptions({ widgets, setWidgets, player }: Rating) {
    //Stats all automatically 1, receptions automatically 1 considering they're a new player
    const [receptions, setReceptions] = useState<number>(
        player.stats.receptions
    );
    // Provide forms for editing the new movie
    // And also a button to append the movie

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }
    function updateReceptions(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            parseInt(event.target.value) >= 0 ||
            isNaN(parseInt(event.target.value))
        ) {
            setReceptions(parseInt(event.target.value) || 0);
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
            receptions: parseInt(event.target.value) || 0
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

    return (
        <div>
            <Form.Group className="editNums" controlId="ReceptionBox">
                <Form.Label>Receptions</Form.Label>
                <Form.Control
                    type="number"
                    value={receptions}
                    onChange={updateReceptions}
                />
            </Form.Group>
        </div>
    );
}
