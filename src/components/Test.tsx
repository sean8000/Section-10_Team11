import React, { useState } from "react";
import "./Test.css";
import { Player } from "../interfaces/player";

function Test() {
// strings for testing
// const players = ["jerry", "terry", "larry"];

    // some players to work with
    const player1: Player = {
        name: "Jerry",
        description: "short",
        image: "mid",
        position: "QB",
        rating: 12,
        stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
    };
    const player2: Player = {
        name: "Terry",
        description: "tall",
        image: "mid",
        position: "RB",
        rating: 9,
        stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
    };
    const player3: Player = {
        name: "Lerry",
        description: "shall",
        image: "mid",
        position: "WR",
        rating: 55,
        stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
    };
    // player list for testing
    const playerList = [player1, player2, player3];

    const [widgets, setWidgets] = useState<string[]>([]);
    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        //console.log("widgetType", widgetType);
        setWidgets([...widgets, widgetType]);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }
    return (
        <div className="Test">
            <div className="widgets">
                {playerList.map((curr: Player) => (
                    <div
                        key="list"
                        className="widget"
                        draggable
                        onDragStart={(e) => handleOnDrag(e, curr.name)}
                    >
                        <div
                            style={{
                                width: "200px",
                                border: "2px solid black"
                            }}
                        >
                            <img
                                src="src\player_images\Aaron.png"
                                width="50px"
                                height="50px"
                                alt="player"
                            />
                            {curr.name}: {curr.position}
                        </div>
                    </div>
                ))}
            </div>
            <div
                className="page"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {widgets.map((widget, index) => (
                    <div className="dropped-widget" key={index}>
                        {widget}
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Test;
