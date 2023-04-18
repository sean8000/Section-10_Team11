import React from "react";
// import { Player } from "../interfaces/player";
import { PlayerCardProps } from "../interfaces/PlayerCardProps";
import { useDrag } from "react-dnd";

function PlayerCard({ Player: player }: PlayerCardProps) {
    const Name = player.name;
    const d = true; //will add a way to pass false later

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { name: player.name },
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
                    width: "200px"
                }}
            >
                {Name}
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