import { Player } from "../interfaces/player";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Test.css";
import { playerList } from "../players";

export function RenderPlayer(player: Player) {
    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    return (
        <div
            key="list"
            className="player"
            draggable
            onDragStart={(e) => handleOnDrag(e, player.name)}
        >
            {player.name} | {player.position} <br /> Rating: {player.rating}
            <img
                src={player.image}
                style={{
                    width: 40,
                    height: 40
                }}
                alt="Here"
            />
        </div>
    );
}
