import React from "react";
import { Player } from "../interfaces/player";
import "../style.css";
import { EditName } from "./subComponentsEdit/EditName";
import { Col, Row, Container } from "react-bootstrap";
import { EditDescription } from "./subComponentsEdit/EditDescription";
import { EditImage } from "./subComponentsEdit/EditImage";
import { EditPosition } from "./subComponentsEdit/EditPosition";
import { EditTouchdowns } from "./subComponentsEdit/EditTouchdowns";
import { EditReceptions } from "./subComponentsEdit/EditReceptions";
import { EditRushAttempts } from "./subComponentsEdit/EditRushAttempts";
import { EditTotalYards } from "./subComponentsEdit/EditTotalYards";
import { EditRating } from "./subComponentsEdit/EditRating";

interface Edits {
    role: string;
    setAdminWidgets: (newStringList: Player[]) => void;
    adminWidgets: Player[];
}

export function SuperAdminEdit({ role, setAdminWidgets, adminWidgets }: Edits) {
    //Stats all automatically 1, rating automatically 1 considering they're a new player
    // Provide forms for editing the new movie
    // And also a button to append the movie
    return (
        <div>
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
                                        <EditName
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditName>
                                    </Row>
                                    <Row>
                                        <EditDescription
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditDescription>
                                    </Row>
                                    <Row>
                                        <EditImage
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditImage>
                                    </Row>
                                    <Row>
                                        <EditPosition
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditPosition>
                                    </Row>
                                </Col>
                                <Col></Col>
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
                                    <Row>
                                        <EditRating
                                            player={curr}
                                            widgets={adminWidgets}
                                            setWidgets={setAdminWidgets}
                                        ></EditRating>
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
