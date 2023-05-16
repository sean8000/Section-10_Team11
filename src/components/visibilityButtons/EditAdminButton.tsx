import "../../style.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Player } from "../../interfaces/player";

export interface Edit {
    visibilty: boolean;
    setVisibility: (newBool: boolean) => void;
    role: string;
    centralList: Player[];
    setCentralList: (newPlayerList: Player[]) => void;
    widgets: Player[];
    filteredList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
}
export function EditAdminButton({
    visibilty,
    setVisibility,
    role,
    widgets,
    setCentralList,
    setFilteredList,
    centralList
}: Edit): JSX.Element {
    return (
        <div>
            {role === "Team Manager" && visibilty === false ? (
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
            ) : role === "Team Manager" && visibilty === true ? (
                <Button
                    data-testid={role + "LeaveEditButton"}
                    onClick={() => {
                        const newList = centralList.map((curr: Player) => {
                            const foundElem = widgets.find(
                                (other: Player): boolean =>
                                    curr.original === other.original
                            );
                            if (foundElem !== undefined) {
                                {
                                    /*}
                                    console.log("This elem" + foundElem);
                                {*/
                                }
                                return foundElem;
                            } else {
                                {
                                    /*}console.log("Elem not found");{*/
                                }
                                return curr;
                            }
                        });
                        {
                            /*}console.log(newList);{*/
                        }
                        setCentralList([...newList]);
                        setFilteredList([...newList]);
                        setVisibility(false);
                    }}
                >
                    {" "}
                    Save your list to central and backout
                </Button>
            ) : (
                <span></span>
            )}
        </div>
    );
}
