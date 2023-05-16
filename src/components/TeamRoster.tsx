import React, { useState } from "react";
import { Player } from "../interfaces/player";
import "../style.css";

export interface TeamRoster {
    playerList: Player[];
}

export function TeamRoster({ playerList }: TeamRoster): JSX.Element {
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

    return (
        <div>
            QB:({num_QB}/1) | RB: ({num_RB}/2) | WR: ({num_WR}/2) | TE: (
            {num_TE}/1) | K: ({num_K}/1)
        </div>
    );
}

export default TeamRoster;
