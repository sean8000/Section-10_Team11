import React, { useState } from "react";
import { Player, Position } from "../interfaces/player";
import { Form, Button } from "react-bootstrap";
import "../style.css";
interface PlayersToBeAdded {
    centralList: Player[];
    setCentralList: (newStringList: Player[]) => void;
    filteredList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
}

export function AddPlayers({
    centralList,
    setCentralList,
    setFilteredList,
    filteredList
}: PlayersToBeAdded) {
    const [playerName, setPlayerName] = useState<string>("");
    const [playerDescription, setPlayerDescription] = useState<string>("");
    const [playerURL, setPlayerURL] = useState<string>("");
    const [newPosition, setNewPosition] = useState<Position>("QB");
    const totalPositions = ["QB", "RB", "WR", "TE", "K"];

    //Stats all automatically 1, rating automatically 1 considering they're a new player

    function addNewPlayer() {
        const newPlayer: Player = {
            name: playerName,
            description: playerDescription,
            image: playerURL,
            position: newPosition,
            stats: {
                touchdowns: 1,
                receptions: 1,
                rushAttempts: 1,
                totalYards: 1
            },
            rating: 1,
            original: playerName
        };
        setCentralList([...centralList, newPlayer]);
        setFilteredList([...filteredList, newPlayer]);
        setPlayerName("");
        setPlayerDescription("");
        setPlayerURL("");
        setNewPosition("QB");
    }
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setPlayerName(event.target.value);
    }
    function updateDesc(event: React.ChangeEvent<HTMLInputElement>) {
        setPlayerDescription(event.target.value);
    }
    function updateURL(event: React.ChangeEvent<HTMLInputElement>) {
        setPlayerURL(event.target.value);
    }
    function updatePosition(event: React.ChangeEvent<HTMLSelectElement>) {
        setNewPosition(event.target.value as Position);
    }
    return (
        <>
            <div className="addingPlayers">
                <h6
                    style={{
                        fontSize: 30,
                        color: "white",
                        fontFamily: "Impact"
                    }}
                >
                    Add Players Here
                </h6>
                <Form.Group
                    className="playerNameBox"
                    controlId="PlayerTextName"
                >
                    <Form.Label style={{ color: "white" }}>
                        Player Name:
                    </Form.Label>
                    <Form.Control value={playerName} onChange={updateName} />
                </Form.Group>
                <Form.Group
                    className="playerDescriptionBox"
                    controlId="PlayerTextDesc"
                >
                    <Form.Label style={{ color: "white" }}>
                        Player Description:
                    </Form.Label>
                    <Form.Control
                        value={playerDescription}
                        onChange={updateDesc}
                    />
                </Form.Group>
                <Form.Group
                    className="playerImageBox"
                    controlId="PlayerTextURL"
                >
                    <Form.Label style={{ color: "white" }}>
                        Image URL:
                    </Form.Label>
                    <Form.Control value={playerURL} onChange={updateURL} />
                </Form.Group>
                <Form.Group className="playerPositionBox" controlId="Positions">
                    <Form.Label style={{ color: "white" }}>
                        Which Position
                    </Form.Label>
                    <Form.Select value={newPosition} onChange={updatePosition}>
                        {totalPositions.map((position: string) => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <br></br>
                <Button
                    data-testid="addPlayer"
                    style={{ backgroundColor: "#000000" }}
                    onClick={addNewPlayer}
                >
                    Add This New Player{" "}
                </Button>
            </div>
            <div className="newPlayerPreview">
                Name: {playerName}
                <br></br>
                Description: {playerDescription}
                <br></br>
                {playerURL !== "" ? (
                    <img
                        src={playerURL}
                        style={{
                            width: "300px",
                            height: "300px"
                        }}
                        alt="Image:"
                    ></img>
                ) : (
                    <span>Image:</span>
                )}
                <br></br>
                {newPosition}
            </div>
        </>
    );
}
