import React, { useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { Player } from "../interfaces/player";

export function playerList(players: Player[]): JSX.Element {
    /*
    const [userAnswer, setUserAnswer] = useState<string>("");

    function updateUserAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        setUserAnswer(event.target.value);
    }
    */

    return (
        <div>
            <ListGroup>
                {players.map((curr: Player) => (
                    // eslint-disable-next-line react/jsx-key
                    <ListGroupItem>curr[name]</ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
