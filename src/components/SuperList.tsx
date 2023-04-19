import React, { useState } from "react";
import { Player } from "../interfaces/player";
import PlayerCard from "./PlayerCard";

const player1: Player = {
    name: "Jerry",
    description: "short",
    image: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/vs40h82nvqaqvyephwwu",
    position: "QB",
    rating: 12,
    stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
};
const player2: Player = {
    name: "Terry",
    description: "tall",
    image: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/pbl27kxsr5ulgxmvtvfn",
    position: "RB",
    rating: 9,
    stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
};
const player3: Player = {
    name: "Lerry",
    description: "shall",
    image: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/btfnqtymqsqgybnv4u6n",
    position: "WR",
    rating: 55,
    stats: { touchdowns: 0, receptions: 0, rushAttempts: 0, totalYards: 0 }
};

const playerList = [player1, player2, player3];

export function SuperList() {
    const [superPlayerList, setSuperPlayerList] = useState<Player[]>([
        player1,
        player2,
        player3
    ]);

    return (
        <div className="PlayerList">
            {superPlayerList.map((curr) => {
                return <PlayerCard key="person" Player={curr}></PlayerCard>;
            })}
        </div>
    );
}

export default SuperList;
