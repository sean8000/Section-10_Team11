import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../style.css";

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
    const [visible, setVisible] = useState<boolean>(false); // keeps track of visibility

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <>
            <div style={{ paddingLeft: 30 }}>
                <Button
                    className="greenButton"
                    data-testid={"statsButton" + role + index}
                    onClick={flipVisibility}
                >
                    View Stats
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
