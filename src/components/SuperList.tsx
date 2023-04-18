import React from "react";
import { Player } from "../interfaces/player";
import PlayerCard from "./PlayerCard";

const player1: Player = {
    name: "Jerry",
    description: "short",
    image: "mid",
    position: "QB",
    rating: 12,
    stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
};
const player2: Player = {
    name: "Terry",
    description: "tall",
    image: "mid",
    position: "RB",
    rating: 9,
    stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
};
const player3: Player = {
    name: "Lerry",
    description: "shall",
    image: "mid",
    position: "WR",
    rating: 55,
    stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
};
const playerList = [player1, player2, player3];

export function SuperList() {
    return (
        <div className="PlayerList">
            {playerList.map((curr) => {
                return <PlayerCard key="person" Player={curr}></PlayerCard>;
            })}
        </div>
    );
}

export default SuperList;
