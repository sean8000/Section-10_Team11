/* eslint-disable indent */
// had to disable this sorry gang
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Test.css";
//import { playerList } from "../players";
import { Player } from "../interfaces/player";
import { PositionFilter } from "./PositionFilter";
import { SortSelect } from "./sortSelect";
import { UserRating } from "./UserRating";
import { AddPlayers } from "./AddPlayers";

interface Widgets {
    setWidgets: (newStringList: Player[]) => void;
    widgets: Player[];
    role: string;
    myMap: Map<string, Player[]>;
    setMyMap: (newRecord: Map<string, Player[]>) => void;
    centralList: Player[];
    setCentralList: (newPlayerList: Player[]) => void;
    adminWidgets: Player[];
    setAdminWidgets: (newPlayerList: Player[]) => void;
    filteredList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Test({
    role,
    widgets,
    setWidgets,
    myMap,
    setMyMap,
    centralList,
    setCentralList,
    adminWidgets,
    setAdminWidgets,
    filteredList,
    setFilteredList
}: Widgets) {
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
    //const [centralList, setCentralList] = useState<Player[]>(playerList);

    // hold current sorting method of central list
    const [centralSort, setCentralSort] = useState<string>("None");
    const filterPositions = ["None", "QB", "RB", "WR", "TE", "K"];
    //const [pos, setPosition] = useState<string>("None");
    //const filterBoolean = [false, false, false, false, false];

    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;

        // find dropped player  object based on name
        const oldPlayer = centralList.find(
            (ele) => ele.name === widgetType
        ) as Player;

        // make a new copy of the player (might not be neccessary?)
        const newPlayer = { ...oldPlayer };

        // add the player to the list
        if (newPlayer !== undefined) {
            setWidgets([...widgets, newPlayer]);
        }
    }

    function handleOnDropAdmin(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;

        // find dropped player  object based on name
        const oldPlayer = centralList.find(
            (ele) => ele.name === widgetType
        ) as Player;

        // add the player original player directly to the list
        // (shallow copy so the admin list players reference the same players as the central list)
        if (
            oldPlayer !== undefined &&
            adminWidgets.filter(
                (player: Player): boolean => player === oldPlayer
            ).length <= 0
        ) {
            setAdminWidgets([...adminWidgets, oldPlayer]);
        }

        console.log(oldPlayer);
        console.log(adminWidgets);
    }

    function handleOnButtonClick(removedPlayer: Player) {
        // modified because now widgets are players, so when you delete one player it doesnt
        // delete other players with the same name
        const newList = widgets.filter(
            (player: Player): boolean => player !== removedPlayer
        );
        console.log(removedPlayer);
        console.log("Player deleted");
        console.log(newList);
        setWidgets(newList);
        setMyMap(myMap.set(role, newList));
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function flipVisibility(): void {
        setVisible(!visible);
    }
    /* function updateCentralList(newCentralList: Player[]) {
        setCentralList(newCentralList);
    } */

    // the curr in the both maps below now represents players,
    // you can access its attributes with dot notation
    // also we should consider makeing a "renderPlayer" function that way we can format the player
    // cards separatly and clean up the code a little
    return (
        <div className="Test">
            <PositionFilter
                filterPosition={filterPositions}
                playerList={centralList}
                setFilteredList={setFilteredList}
            ></PositionFilter>
            <SortSelect
                sortOption={centralSort}
                setSortOption={setCentralSort}
                playerList={filteredList}
                setPlayerList={setFilteredList}
            ></SortSelect>
            <div className="central">
                <h4 className="playersTitle">Players</h4>
                <br></br>
                {filteredList.map((curr, index) => (
                    <div
                        key={curr.name}
                        data-testid={index}
                        className="player"
                        draggable
                        onDragStart={(e) => handleOnDrag(e, curr.name)}
                    >
                        <div className="playerNameAndPosition">
                            {curr.name} | {curr.position} <br />
                        </div>
                        <img
                            className="playerImage"
                            src={curr.image}
                            alt="Image"
                        />
                        <div>
                            {visible && (
                                <div>
                                    Description: {curr.description}
                                    <br />
                                    Touchdowns: {curr.stats.touchdowns}
                                    <br />
                                    Receptions: {curr.stats.receptions}
                                    <br />
                                    Rush Attempts: {curr.stats.rushAttempts}
                                    <br />
                                    Yards: {curr.stats.totalYards}
                                    <br />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/*}
            <Button data-testid="stats" onClick={flipVisibility}>
                STATS
            </Button>
                            
            <span
                data-testid="playerCount"
                style={{ color: "white", fontSize: "20" }}
            >
                Current player count in the central list is:{" "}
                {filteredList.length}
            </span>
                            */}
            {role === "Team Manager" ? (
                <div
                    className="user"
                    onDrop={handleOnDropAdmin}
                    onDragOver={handleDragOver}
                >
                    <h4 className="playersTitle">Admin List</h4>
                    {adminWidgets.map((curr, index) => (
                        <div className="player" key={index}>
                            {curr.name} | {curr.position} <br /> Rating:{" "}
                            {curr.rating}
                            <img
                                className="playerImage"
                                src={curr.image}
                                alt="Image"
                            />
                            <Button onClick={() => handleOnButtonClick(curr)}>
                                Delete Player
                            </Button>
                            {setMyMap(myMap.set(role, [...widgets]))}
                        </div>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
            {role !== "League Manager" && role !== "Team Manager" ? (
                <div
                    className="user"
                    onDrop={handleOnDrop}
                    onDragOver={handleDragOver}
                >
                    <h4 className="playersTitle">Your Team</h4>
                    <br></br>
                    {widgets.map((curr, index) => (
                        <div
                            className="player"
                            key={"other" + index}
                            data-testid={"other" + index}
                        >
                            {curr.name} | {curr.position} <br />{" "}
                            <img
                                className="playerImage"
                                src={curr.image}
                                alt="Image"
                            />
                            <div className="userChangeRatings">
                                <span>Rating: {curr.rating}</span>
                                {console.log(widgets.indexOf(curr))}
                                <UserRating
                                    player={curr}
                                    widgets={widgets}
                                    setWidgets={setWidgets}
                                ></UserRating>
                                {setMyMap(myMap.set(role, [...widgets]))}
                                <Button
                                    onClick={() => handleOnButtonClick(curr)}
                                >
                                    Delete Player
                                </Button>
                            </div>
                            <div>
                                {/*}
                                            <Button onClick={flipVisibility}>
                                                STATS
                                            </Button>
                                            {visible && (
                                                <div>
                                                    Description:{" "}
                                                    {curr.description}
                                                    <br />
                                                    Touchdowns:{" "}
                                                    {curr.stats.touchdowns}
                                                    <br />
                                                    Receptions:{" "}
                                                    {curr.stats.receptions}
                                                    <br />
                                                    Rush Attempts:{" "}
                                                    {curr.stats.rushAttempts}
                                                    <br />
                                                    Yards:{" "}
                                                    {curr.stats.totalYards}
                                                    <br />
                                                </div>
                                            )}
                                            {*/}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="addPlayer">
                    <AddPlayers
                        centralList={centralList}
                        setCentralList={setCentralList}
                        setFilteredList={setFilteredList}
                        filteredList={filteredList}
                    ></AddPlayers>
                </div>
            )}
        </div>
    );
}

export default Test;
