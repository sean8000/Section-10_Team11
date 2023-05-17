/* eslint-disable indent */
import "../../style.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Player } from "../../interfaces/player";

export interface Edit {
    visibilty: boolean;
    setVisibility: (newBool: boolean) => void;
    role: string;
    widgetList: Player[];
    setUserFilteredList: (newPlayerList: Player[]) => void;
}
export function EditUserButton({
    visibilty,
    setVisibility,
    role,
    widgetList,
    setUserFilteredList
}: Edit): JSX.Element {
    return (
        <div>
            {role !== "Team Manager" &&
            role !== "League Manager" &&
            visibilty === false ? (
                <div>
                    <Button
                        data-testid={role + "EditButton"}
                        onClick={() => {
                            setVisibility(!visibilty);
                        }}
                    >
                        {" "}
                        Edit your players
                    </Button>
                </div>
            ) : role !== "Team Manager" &&
              role !== "League Manager" &&
              visibilty === true ? (
                <Button
                    data-testid={role + "LeaveEditButton"}
                    onClick={() => {
                        setUserFilteredList([...widgetList]);
                        setVisibility(false);
                    }}
                >
                    {" "}
                    Save your list changes and back out
                </Button>
            ) : (
                <span></span>
            )}
        </div>
    );
}
