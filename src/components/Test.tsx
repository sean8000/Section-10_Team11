import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Test.css";
import { playerList } from "../players";
import { Player } from "../interfaces/player";
import { SortSelect } from "./sortSelect";

interface Widgets {
    setWidgets: (newStringList: Player[]) => void;
    widgets: Player[];
    role: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Test({ role, widgets, setWidgets }: Widgets) {
    /* const players = ["jerry", "terry", "larry"];
    const player_map: Record<string, string> = {
        jerry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu",
        terry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/pbl27kxsr5ulgxmvtvfn",
        larry: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/btfnqtymqsqgybnv4u6n"
    }; */

    // YOU CAN ACCESS THE PLAYER LIST THROUGH THE IMPORTED "playerList" VARIABLE
    // IT IS AN ARRAY OF PLAYER OBJECTS
    // BELOW IS AN ARRAY FOR THE CENTRAL LIST USING STATE
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [centralList, setCentralList] = useState<Player[]>(playerList);

    // hold current sorting method of central list
    const [centralSort, setCentralSort] = useState<string>("None");

    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;

        // find dropped player  object based on name
        const oldPlayer = playerList.find(
            (ele) => ele.name === widgetType
        ) as Player;

        // make a new copy of the player (might not be neccessary?)
        const newPlayer = { ...oldPlayer };

        // add the player to the list
        if (newPlayer !== undefined) {
            setWidgets([...widgets, newPlayer]);
        }
    }

    function handleOnButtonClick(removedPlayer: Player) {
        // modified because now widgets are players, so when you delete one player it doesnt
        // delete other players with the same name
        const newList = widgets.filter(
            (player: Player): boolean => player !== removedPlayer
        );
        setWidgets(newList);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function updateCentralList(newCentralList: Player[]) {
        setCentralList(newCentralList);
    }

    /* const tempCentralList = centralList;
    if (centralSort === "None") {
        // Does nothing
    } else if (centralSort === "Position") {
        tempCentralList.sort((a, b) => (a.name < b.name ? -1 : 1));
    } else if (centralSort === "Rating") {
        tempCentralList.sort((a, b) => (a.position < b.position ? -1 : 1));
    } else if (centralSort === "Touchdowns") {
        tempCentralList.sort((a, b) =>
            a.stats.touchdowns < b.stats.touchdowns ? -1 : 1
        );
    }
    updateCentralList(tempCentralList); */

    // the curr in the both maps below now represents players,
    // you can access its attributes with dot notation
    // also we should consider makeing a "renderPlayer" function that way we can format the player
    // cards separatly and clean up the code a little
    return (
        <div className="Test">
            <div className="central">
                <h4 className="playersTitle">Players</h4>
                Sort by:
                <SortSelect
                    sortOption={centralSort}
                    setSortOption={setCentralSort}
                    playerList={centralList}
                    setPlayerList={setCentralList}
                ></SortSelect>
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
                ; Currently Sorting By {centralSort}
            </div>
            <div
                className="user"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                <h4 className="playersTitle">Your Team</h4>
                {widgets.map((curr, index) => (
                    <div className="player" key={index}>
                        {curr.name}
                        <img
                            src={curr.image}
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
