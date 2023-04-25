import React, { useState } from "react";
import { Player, Position } from "../interfaces/player";
import { Form, Button } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
interface PlayersToBeAdded {
    centralList: Player[];
    setCentralList: (newStringList: Player[]) => void;
}

export function AddPlayers({ centralList, setCentralList }: PlayersToBeAdded) {
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
            rating: 1
        };
        setCentralList([...centralList, newPlayer]);
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
        <div>
            <Container>
                <Row>
                    <div>
                        <Col>
                            <Form.Group controlId="PlayerTextName">
                                <Form.Label style={{ color: "white" }}>
                                    Player Name: {playerName}
                                </Form.Label>
                                <Form.Control
                                    value={playerName}
                                    onChange={updateName}
                                />
                            </Form.Group>

                            <Form.Group controlId="PlayerTextDesc">
                                <Form.Label style={{ color: "white" }}>
                                    Player Description: {playerDescription}
                                </Form.Label>
                                <Form.Control
                                    value={playerDescription}
                                    onChange={updateDesc}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="PlayerTextURL">
                                <Form.Label style={{ color: "white" }}>
                                    Image URL: {playerURL}
                                </Form.Label>
                                <Form.Control
                                    value={playerURL}
                                    onChange={updateURL}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Positions">
                                <Form.Label className="roleSelectHeadings">
                                    Which Position
                                </Form.Label>
                                <Form.Select
                                    value={newPosition}
                                    onChange={updatePosition}
                                >
                                    {totalPositions.map((position: string) => (
                                        <option key={position} value={position}>
                                            {position}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button
                                style={{ backgroundColor: "#000000" }}
                                onClick={addNewPlayer}
                            >
                                Add This New Player:{" "}
                            </Button>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    );
}
