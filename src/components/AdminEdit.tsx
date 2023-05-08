//import { Player, Position } from "../interfaces/player";
import React from "react";
import { Player } from "../interfaces/player";
import "../style.css";

interface Edits {
    //editAdmin: boolean;
    role: string;
    //setAdminEdit: (newBool: boolean) => void;
    //setAdminWidgets: (newStringList: Player[]) => void;
    adminWidgets: Player[];
    //centralList: Player[];
    //setCentralList: (newPlayerList: Player[]) => void;
    //myMap: Map<string, Player[]>;
}

export function AdminEdit({
    role,
    //editAdmin,
    //setAdminEdit,
    //setAdminWidgets,
    adminWidgets
}: //centralList,
//setCentralList,
//myMap
Edits) {
    //Stats all automatically 1, rating automatically 1 considering they're a new player
    // Provide forms for editing the new movie
    // And also a button to append the movie
    return (
        <div>
            {adminWidgets.map((curr, index) => (
                <div
                    className="playerWidget"
                    key={"other" + role + index}
                    data-testid={"other" + role + index}
                >
                    <div className="playerNameAndPosition">
                        {curr.name} | {curr.position} <br />{" "}
                        <img
                            className="playerImage"
                            src={curr.image}
                            alt="Image"
                        />
                        <span>Overall: {curr.rating}</span>
                    </div>
                    <div className="userChangeRatings">
                        {console.log(adminWidgets.indexOf(curr))}
                    </div>
                    <div></div>
                </div>
            ))}
        </div>
    );
}
