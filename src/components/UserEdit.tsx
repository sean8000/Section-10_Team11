import React from "react";
import { Player } from "../interfaces/player";
import "../style.css";
import { Col, Row, Container } from "react-bootstrap";
import { EditTouchdowns } from "./subComponentsEdit/EditTouchdowns";
import { EditReceptions } from "./subComponentsEdit/EditReceptions";
import { EditRushAttempts } from "./subComponentsEdit/EditRushAttempts";
import { EditTotalYards } from "./subComponentsEdit/EditTotalYards";

interface Edits {
    role: string;
    setAdminWidgets: (newStringList: Player[]) => void;
    adminWidgets: Player[];
}

export function UserEdit({ role, setAdminWidgets, adminWidgets }: Edits) {
    //Stats all automatically 1, rating automatically 1 considering they're a new player
    // Provide forms for editing the new movie
    // And also a button to append the movie
    return (
        <div>
            <h1 style={{ color: "white" }}>
                You Can Only Edit The Dictionary Stats as a User
                <br></br>
                These Changes Will Not Affect The Central List
            </h1>
            {adminWidgets.map((curr, index) => (
                <div
                    className="playerEdit"
                    key={"other" + role + index}
                    data-testid={"other" + role + index}
                >
                    <div className="playerNameAndPosition">
                        {curr.name} | {curr.position} <br />{" "}
                        <img
                            className="playerImageEdit"
                            src={curr.image}
                            alt="Image"
                        />
                    </div>
                    <div className="editFontSize">
                        <Container>
                            <Row>
                                <Col>
                                    <Row>
                                        <EditTouchdowns
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditTouchdowns>
                                    </Row>
                                    <Row>
                                        <EditReceptions
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditReceptions>
                                    </Row>
                                    <Row>
                                        <EditRushAttempts
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditRushAttempts>
                                    </Row>
                                    <Row>
                                        <EditTotalYards
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditTotalYards>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            ))}
        </div>
    );
}
