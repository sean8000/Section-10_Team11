//import React from "react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../style.css";
//import { playerList } from "../players";
// commented out some imports to avoid warnings

// FOR FUTURE USE SO WE CAN PASS PLAYERS TO THIS FUNCTION TO AUTO RENDER THEM
export interface playerAtts {
    index: number;
    description: string;
    touchdowns: number;
    receptions: number;
    rushAttempts: number;
    totalYards: number;
    role: string;
}
export function PlayerStats({
    index,
    description,
    touchdowns,
    receptions,
    rushAttempts,
    totalYards,
    role
}: playerAtts) {
    const [visible, setVisible] = useState<boolean>(false);

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <>
            <div style={{ paddingLeft: 30 }}>
                <Button
                    data-testid={"statsButton" + role + index}
                    onClick={flipVisibility}
                >
                    STATS
                </Button>
                {visible && (
                    <div>
                        Description: {description}
                        <br />
                        Touchdowns: {touchdowns}
                        <br />
                        Receptions: {receptions}
                        <br />
                        Rush Attempts: {rushAttempts}
                        <br />
                        Yards: {totalYards}
                        <br />
                    </div>
                )}
            </div>
        </>
    );
}
