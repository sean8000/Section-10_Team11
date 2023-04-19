import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Test.css";
import { playerList } from "../players";
import { Player } from "../interfaces/player";

interface Widgets {
    setWidgets: (newStringList: string[]) => void;
    widgets: string[];
    role: string;
}
function Test({ role, widgets, setWidgets }: Widgets) {
    const players = ["jerry", "terry", "larry"];
    const player_map: Record<string, string> = {
        jerry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu",
        terry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/pbl27kxsr5ulgxmvtvfn",
        larry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/btfnqtymqsqgybnv4u6n"
    };

    // YOU CAN ACCESS THE PLAYER LIST THROUGH THE IMPORTED "playerList" VARIABLE
    // IT IS AN ARRAY OF PLAYER OBJECTS
    // BELOW IS AN ARRAY FOR THE CENTRAL LIST USING STATE
    const [centralList, setCentralList] = useState<Player[]>(playerList);

    //const [widgets, setWidgets] = useState<string[]>([]);
    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        //console.log("widgetType", widgetType);
        setWidgets([...widgets, widgetType]);
    }
    function handleOnButtonClick(removedPlayer: string) {
        // to fix maybe generate and ID thats attached to each player when they get added to the user list
        const newList = widgets.filter(
            (player: string): boolean => player !== removedPlayer
        );
        setWidgets(newList);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    // the curr in the first map below now represents a player,
    // you can access its attributes with dot notation
    return (
        <div className="Test">
            <div className="central">
                <span> Central List </span>
                {centralList.map((curr: Player) => (
                    <div
                        key="list"
                        className="player"
                        draggable
                        onDragStart={(e) => handleOnDrag(e, curr.name)}
                    >
                        {curr.name} | {curr.position} <br /> Rating:{" "}
                        {curr.rating}
                        <img
                            src={curr.image}
                            style={{
                                width: 40,
                                height: 40
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
                <span> List for: {role}</span>
                {widgets.map((curr, index) => (
                    <div className="player" key={index}>
                        {curr}
                        <img
                            src={player_map[curr]}
                            style={{
                                width: 40,
                                height: 40
                            }}
                            alt="Here"
                        />
                        <Button onClick={() => handleOnButtonClick(curr)}>
                            Delete Player
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;
