/* eslint-disable indent */
import "../../style.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Player } from "../../interfaces/player";

export interface Edit {
    visibilty: boolean;
    setVisibility: (newBool: boolean) => void;
    role: string;
    setFilteredList: (newPlayerList: Player[]) => void;
    centralList: Player[];
}
export function EditSuperButton({
    visibilty,
    setVisibility,
    role,
    setFilteredList,
    centralList
}: Edit): JSX.Element {
    return (
        <div className="headingButton">
            {role === "League Manager" && visibilty === false ? (
                <div>
                    <Button
                        className="greenButton"
                        data-testid={role + "EditButton"}
                        onClick={() => {
                            setVisibility(!visibilty);
                        }}
                    >
                        {" "}
                        Edit the central list
                    </Button>
                </div>
            ) : role === "League Manager" && visibilty === true ? (
                <Button
                    data-testid={role + "LeaveEditButton"}
                    onClick={() => {
                        setFilteredList([...centralList]);
                        setVisibility(false);
                    }}
                >
                    {" "}
                    Save your changes and return
                </Button>
            ) : (
                <span></span>
            )}
        </div>
    );
}
