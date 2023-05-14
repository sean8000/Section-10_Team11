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

export function EditTotalYards({ widgets, setWidgets, player }: Rating) {
    //Stats all automatically 1, totalYards automatically 1 considering they're a new player
    const [totalYards, setTotalYards] = useState<number>(
        player.stats.totalYards
    );
    // Provide forms for editing the new movie
    // And also a button to append the movie

    function getPlayerIndex() {
        return widgets.indexOf(player);
    }
    function updateTotalYards(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            parseInt(event.target.value) >= 0 ||
            isNaN(parseInt(event.target.value))
        ) {
            setTotalYards(parseInt(event.target.value) || 0);
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
            totalYards: parseInt(event.target.value) || 0
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
            <Form.Group className="editNums" controlId="TotalYardsBox">
                <Form.Label>Total Yards</Form.Label>
                <Form.Control
                    data-testid={"totalYards" + getPlayerIndex()}
                    type="number"
                    value={totalYards}
                    onChange={updateTotalYards}
                />
            </Form.Group>
        </div>
    );
}
