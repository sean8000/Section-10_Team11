import React, { useState } from "react";
import "./Test.css";

function Test() {
    const players = ["jerry", "terry", "larry"];
    const player_map: Record<string, string> = {
        jerry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu",
        terry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/pbl27kxsr5ulgxmvtvfn",
        larry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/btfnqtymqsqgybnv4u6n"
    };
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
            <div className="central">
                {players.map((curr: string) => (
                    <div
                        key="list"
                        className="player"
                        draggable
                        onDragStart={(e) => handleOnDrag(e, curr)}
                    >
                        {curr}
                        <img
                            src={player_map[curr]}
                            style={{
                                width: 50,
                                height: 50
                            }}
                            alt="Here"
                        />
                    </div>
                ))}
            </div>
            <div
                className="user"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {widgets.map((curr, index) => (
                    <div className="player" key={index}>
                        {curr}
                        <img
                            src={player_map[curr]}
                            style={{
                                width: 50,
                                height: 50
                            }}
                            alt="Here"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;
