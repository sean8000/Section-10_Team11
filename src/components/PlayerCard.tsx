import React from "react";
// import { Player } from "../interfaces/player";
import { PlayerCardProps } from "../interfaces/PlayerCardProps";
import { useDrag } from "react-dnd";
import { Col, Container, Row } from "react-bootstrap";

function PlayerCard({ Player: player }: PlayerCardProps) {
    const Name = player.name;
    const Position = player.position;
    const Image = player.image;
    const Rating = player.rating;

    const d = true; //will add a way to pass false later

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { player: player },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    if (d) {
        return (
            <div
                ref={drag}
                className="PlayerCard"
                style={{
                    border: isDragging ? "2px solid red" : "2px solid black",
                    background: isDragging ? "solid pink" : "solid white",
                    width: "270px"
                }}
            >
                <Container>
                    <Row>
                        <Col>
                            {Name} | {Position} <br /> Rating: {Rating}
                        </Col>
                        <Col>
                            <img
                                src={Image}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                                alt="Here"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    } else {
        return (
            <div
                className="PlayerCard"
                style={{
                    border: isDragging ? "2px solid red" : "2px solid black",
                    width: "200px"
                }}
            >
                {Name}
            </div>
        );
    }
}

export default PlayerCard;
