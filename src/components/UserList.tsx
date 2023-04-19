import React, { useState } from "react";
import { Player } from "../interfaces/player";
import PlayerCard from "./PlayerCard";
import { DragSourceHookSpec, useDrop } from "react-dnd";
import { PlayerCardProps } from "../interfaces/PlayerCardProps";

export function UserList() {
    const [userPlayerList, setUserPlayerList] = useState<Player[]>([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "card",
        drop: (item: { player: Player }) => addPlayerToList(item.player),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    function addPlayerToList(player: Player) {
        console.log(player.name);
        setUserPlayerList((userPlayerList) => [...userPlayerList, player]);
    }

    return (
        <div
            ref={drop}
            className="PlayerList"
            style={{
                border: isOver ? "3px solid red" : "3px solid black",
                height: "400px"
            }}
        >
            {userPlayerList.map((curr) => {
                return <PlayerCard key="person" Player={curr}></PlayerCard>;
            })}
        </div>
    );
}

export default UserList;
