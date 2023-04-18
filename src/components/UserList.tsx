import React, { useState } from "react";
import { Player } from "../interfaces/player";
import PlayerCard from "./PlayerCard";
import { DragSourceHookSpec, useDrop } from "react-dnd";
import { PlayerCardProps } from "../interfaces/PlayerCardProps";

export function UserList() {
    const [userPlayerList, setUserPlayerList] = useState<string[]>([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "card",
        drop: (item) => addPlayerToList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    function addPlayerToList(name: string) {
        console.log(name);
        setUserPlayerList([name, ...userPlayerList]);
    }

    return (
        <div
            ref={drop}
            className="PlayerList"
            style={{ border: "3px solid black" }}
        >
            {userPlayerList.map((curr) => {
                return <PlayerCard key="person" Player={curr}></PlayerCard>;
            })}
        </div>
    );
}
