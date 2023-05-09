import { Player } from "../interfaces/player";
//import React from "react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../style.css";
//import { playerList } from "../players";
// commented out some imports to avoid warnings

// FOR FUTURE USE SO WE CAN PASS PLAYERS TO THIS FUNCTION TO AUTO RENDER THEM

export function PlayerStats(player: Player) {
    const [visible, setVisible] = useState<boolean>(false);

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <>
            <div style={{ paddingLeft: 30 }}>
                <Button onClick={flipVisibility}>STATS</Button>
                {visible && (
                    <div>
                        Description: {player.description}
                        <br />
                        Touchdowns: {player.stats.touchdowns}
                        <br />
                        Receptions: {player.stats.receptions}
                        <br />
                        Rush Attempts: {player.stats.rushAttempts}
                        <br />
                        Yards: {player.stats.totalYards}
                        <br />
                    </div>
                )}
            </div>
        </>
    );
}
