/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../style.css";
import { Player } from "../interfaces/player";
import { UserRating } from "./UserRating";
import { AddPlayers } from "./AddPlayers";
import { PlayerStats } from "./PlayerStats";
import { TeamRoster } from "./TeamRoster";
import { SortFilterBox } from "./SortFilterBox";

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
    userFilteredList: Player[];
    setUserFilteredList: (newPlayerList: Player[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DragAndDisplay({
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
    setFilteredList,
    userFilteredList,
    setUserFilteredList
}: Widgets) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // hold current sorting method of central list
    const [centralSort, setCentralSort] = useState<string>("None");
    const [userSort, setUserSort] = useState<string>("None"); // state to keep track of user sorting
    const [centralSearchText, setCentralSearchText] = useState<string>("");
    const [userSearchText, setUserSearchText] = useState<string>("");
    const [centralFilter, setCentralFilter] = useState<string>("None");
    const [userFilter, setUserFilter] = useState<string>("None");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const filterPositions = [
        "None",
        "QB",
        "RB",
        "WR",
        "TE",
        "K",
        "Rating > 90"
    ];

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
            filteredList.map((p1: Player) =>
                p1.original === newPlayer.original ? p1.count++ : 0
            );
            setWidgets([...widgets, newPlayer]);
            setUserFilteredList([...widgets, newPlayer]);
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
        {
            /*}
        console.log(oldPlayer);
        console.log([...adminWidgets, oldPlayer]);
        {*/
        }
    }

    function addToTeam(newPlayer: Player) {
        // modified because now widgets are players, so when you delete one player it doesnt
        // delete other players with the same name
        filteredList.map((p1: Player) =>
            p1.original === newPlayer.original ? p1.count++ : 0
        );
        const newList = [...widgets, newPlayer];
        setWidgets(newList);
        setUserFilteredList([...widgets, newPlayer]);
    }
    function addToAdminTeam(newPlayer: Player) {
        // modified because now widgets are players, so when you delete one player it doesnt
        // delete other players with the same name
        if (!adminWidgets.includes(newPlayer)) {
            const newList = [...adminWidgets, newPlayer];
            {
                /*}console.log(newList);{*/
            }
            setAdminWidgets(newList);
        } else {
            {
                /*}
            console.log("player already in list");
        {*/
            }
        }
    }
    function handleOnButtonClick(removedPlayer: Player) {
        // modified because now widgets are players, so when you delete one player it doesnt
        // delete other players with the same name
        filteredList.map((p1: Player) =>
            p1.original === removedPlayer.original ? p1.count-- : 0
        );
        const newList = widgets.filter(
            (player: Player): boolean => player !== removedPlayer
        );
        const newFilteredList = userFilteredList.filter(
            (player: Player): boolean => player !== removedPlayer
        );

        setWidgets(newList);
        setUserFilteredList(newFilteredList);
        setMyMap(myMap.set(role, newList));
    }

    function handleOnAdminButtonClick(removedPlayer: Player) {
        const newList = adminWidgets.filter(
            (player: Player): boolean => player !== removedPlayer
        );

        setAdminWidgets(newList);
    }
    function deleteAsSuper(removedPlayer: Player) {
        // modified because now widgets are players, so when you delete one player it doesnt
        // delete other players with the same name
        const newCentralList = centralList.filter(
            (player: Player): boolean => player !== removedPlayer
        );
        const newListFilter = filteredList.filter(
            (player: Player): boolean => player !== removedPlayer
        );
        setCentralList(newCentralList);
        setFilteredList(newListFilter);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    // the curr in the both maps below now represents players,
    // you can access its attributes with dot notation
    // also we should consider makeing a "renderPlayer" function that way we can format the player
    // cards separatly and clean up the code a little
    return (
        <div className="Test">
            <SortFilterBox
                playerList={centralList}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                filterPositions={filterPositions}
                sortOption={centralSort}
                setSortOption={setCentralSort}
                searchText={centralSearchText}
                setSearchText={setCentralSearchText}
                name="central-box"
                labelText="Central Description Filter"
                filterOption={centralFilter}
                setFilterOption={setCentralFilter}
            ></SortFilterBox>
            <div className="central">
                <h4 className="playersTitle">Players</h4>
                <br></br>
                <div style={{ background: "red" }}>
                    <br></br>
                    <span
                        data-testid="playerCount"
                        style={{ color: "white", fontSize: "20" }}
                    >
                        Current player count in the central list is:{" "}
                        {filteredList.length}
                    </span>
                </div>
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
                            Overall: {curr.rating}
                            <br />
                            {role !== "League Manager" ? (
                                role === "Team Manager" ? (
                                    <Button
                                        data-testid={"adminButton" + index}
                                        onClick={() => addToAdminTeam(curr)}
                                    >
                                        Add Player to Your Team
                                    </Button>
                                ) : (
                                    <Button
                                        data-testid={"userButton" + index}
                                        onClick={() => addToTeam(curr)}
                                    >
                                        Add Player to Your Team
                                    </Button>
                                )
                            ) : (
                                "No. In Use: " + curr.count
                            )}
                        </div>
                        {role === "League Manager" ? (
                            <div
                                style={{
                                    float: "right",
                                    paddingRight: 70,
                                    marginTop: -130
                                }}
                            >
                                <Button
                                    data-testid={"deleteButtonSuper" + index}
                                    className="trashcan"
                                    style={{
                                        backgroundImage:
                                            "url('https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png')"
                                    }}
                                    draggable="false"
                                    onClick={() => deleteAsSuper(curr)}
                                ></Button>
                            </div>
                        ) : (
                            ""
                        )}
                        <img
                            className="playerImage"
                            src={curr.image}
                            alt="Image"
                        />
                        <PlayerStats
                            role="Super"
                            index={index}
                            description={curr.description}
                            touchdowns={curr.stats.touchdowns}
                            receptions={curr.stats.receptions}
                            rushAttempts={curr.stats.rushAttempts}
                            totalYards={curr.stats.totalYards}
                        ></PlayerStats>
                    </div>
                ))}
            </div>
            {role === "Team Manager" ? (
                <div
                    className="userEdited"
                    onDrop={handleOnDropAdmin}
                    onDragOver={handleDragOver}
                >
                    <h4 className="playersTitleRevised">Manage Your Team</h4>
                    <div style={{ background: "white" }}>
                        <br></br>
                        <br></br>
                    </div>
                    {adminWidgets.map((curr, index) => (
                        <div
                            className="playerWidgetAdmin"
                            key={"otherAdmin" + index}
                            data-testid={"otherAdmin" + index}
                            draggable="false"
                        >
                            <div className="playerNameAndPosition">
                                {curr.name} | {curr.position} <br />{" "}
                                <img
                                    className="playerImage"
                                    src={curr.image}
                                    alt="Image"
                                    draggable="false"
                                />
                                <span>Overall: {curr.rating}</span>
                            </div>
                            {/*}{setMyMap(myMap.set(role, [...adminWidgets]))}{*/}
                            <div className="userChangeRatings">
                                <div style={{ paddingRight: 70 }}>
                                    <Button
                                        data-testid={
                                            "deleteButtonAdmin" + index
                                        }
                                        className="trashcan"
                                        style={{
                                            backgroundImage:
                                                "url('https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png')"
                                        }}
                                        draggable="false"
                                        onClick={() =>
                                            handleOnAdminButtonClick(curr)
                                        }
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="addPlayerInListText">
                        <br></br>
                        Drag Here
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            {role !== "League Manager" && role !== "Team Manager" ? (
                <div
                    style={{
                        float: "right",
                        marginRight: 50,
                        marginTop: -197
                    }}
                >
                    <div style={{ paddingLeft: 50 }}>
                        <SortFilterBox
                            playerList={widgets}
                            filteredList={userFilteredList}
                            setFilteredList={setUserFilteredList}
                            filterPositions={filterPositions}
                            sortOption={userSort}
                            setSortOption={setUserSort}
                            searchText={userSearchText}
                            setSearchText={setUserSearchText}
                            name="user-box"
                            labelText="User Description Filter"
                            setFilterOption={setUserFilter}
                            filterOption={userFilter}
                        ></SortFilterBox>
                    </div>
                    <div
                        className="userEdited"
                        onDrop={handleOnDrop}
                        onDragOver={handleDragOver}
                    >
                        <h4 className="playersTitleRevised">Build Your Team</h4>
                        <div style={{ background: "white" }}>
                            <br></br>
                            <br></br>
                        </div>
                        {userFilteredList?.map(
                            (curr: Player, index: number) => (
                                <div
                                    className="playerWidget"
                                    key={"other" + role + index}
                                    data-testid={"other" + role + index}
                                    draggable="false"
                                >
                                    <div className="userChangeRatings">
                                        <UserRating
                                            player={curr}
                                            widgets={widgets}
                                            setWidgets={setWidgets}
                                            setUserFilteredList={
                                                setUserFilteredList
                                            }
                                            userFilteredList={userFilteredList}
                                        ></UserRating>
                                    </div>
                                    <div className="playerNameAndPosition">
                                        {curr.name} | {curr.position} <br />{" "}
                                        <img
                                            className="playerImageUser"
                                            style={{ marginRight: -100 }}
                                            src={curr.image}
                                            alt="Image"
                                            draggable="false"
                                        />
                                        <span>Overall: {curr.rating}</span>
                                    </div>
                                    {/*} Needed to make stats button to go on the left {*/}
                                    <PlayerStats
                                        index={index}
                                        role={role}
                                        description={curr.description}
                                        touchdowns={curr.stats.touchdowns}
                                        receptions={curr.stats.receptions}
                                        rushAttempts={curr.stats.rushAttempts}
                                        totalYards={curr.stats.totalYards}
                                    ></PlayerStats>
                                    <div style={{ paddingLeft: 30 }}>
                                        <Button
                                            data-testid={
                                                "deleteButton" + role + index
                                            }
                                            className="trashcan"
                                            style={{
                                                backgroundImage:
                                                    "url('https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png')"
                                            }}
                                            draggable="false"
                                            onClick={() =>
                                                handleOnButtonClick(curr)
                                            }
                                        ></Button>
                                    </div>
                                    <div></div>
                                </div>
                            )
                        )}
                        <div className="addPlayerInListText">
                            <br></br>
                            Drag Here
                        </div>
                    </div>
                    <TeamRoster playerList={widgets}></TeamRoster>
                </div>
            ) : role === "League Manager" ? (
                <div>
                    <AddPlayers
                        centralList={centralList}
                        setCentralList={setCentralList}
                        setFilteredList={setFilteredList}
                        filteredList={filteredList}
                    ></AddPlayers>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default DragAndDisplay;
