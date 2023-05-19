import React from "react";
import { Player } from "../interfaces/player";
import "../style.css";

export interface TeamRoster {
    playerList: Player[];
}

export function TeamRoster({ playerList }: TeamRoster): JSX.Element {
    // variables that hold the number of each position
    const num_QB = playerList.filter(
        (player: Player): boolean => player.position === "QB"
    ).length;
    const num_RB = playerList.filter(
        (player: Player): boolean => player.position === "RB"
    ).length;
    const num_WR = playerList.filter(
        (player: Player): boolean => player.position === "WR"
    ).length;
    const num_TE = playerList.filter(
        (player: Player): boolean => player.position === "TE"
    ).length;
    const num_K = playerList.filter(
        (player: Player): boolean => player.position === "K"
    ).length;

    // apologies this html is not pretty
    return (
        <div className="teamRoster">
            QB <br></br> ({num_QB}/1)
            <br></br> _____ <br></br> RB <br></br> ({num_RB}/2) <br></br>
            _____<br></br> WR <br></br> ({num_WR}
            /2) <br></br>
            _____<br></br>
            TE <br></br> ({num_TE}/1) <br></br>
            _____ <br></br> K <br></br>({num_K}/1)
        </div>
    );
}

export default TeamRoster;
