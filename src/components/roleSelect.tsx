import "../style.css";
import React, { useState } from "react";
import { UserText } from "./UserText";
import { Form, Button } from "react-bootstrap";
import { Player } from "../interfaces/player";

interface Roles {
    setRole: (newString: string) => void;
    role: string;
    widgets: Player[];
    setWidgets: (newStringList: Player[]) => void;
    adminWidgets: Player[];
    setAdminWidgets: (newStringList: Player[]) => void;
    totalRoles: string[];
    setTotalRoles: (newStringList: string[]) => void;
    myMap: Map<string, Player[]>;
    setMyMap: (newMap: Map<string, Player[]>) => void;
    setAdminEdit: (newValue: boolean) => void;
}
export function RoleSelect({
    setRole,
    role,
    myMap,
    setWidgets,
    totalRoles,
    setTotalRoles,
    widgets,
    adminWidgets,
    setAdminWidgets,
    setMyMap,
    setAdminEdit
}: Roles): JSX.Element {
    //const [role, setRole] = useState<string>("Super");
    const [userText, setUserText] = useState<string>("");
    function updateRole(event: React.ChangeEvent<HTMLSelectElement>) {
        if (role === "Team Manager") {
            console.log("Team Manager");
            setMyMap(myMap.set(role, [...adminWidgets]));
        } else {
            setMyMap(myMap.set(role, [...widgets]));
        }
        setRole(event.target.value);
        if (event.target.value === "Team Manager") {
            setAdminWidgets(myMap.get(event.target.value) ?? []);
        } else {
            setWidgets(myMap.get(event.target.value) ?? []);
        }
        setAdminEdit(false);
    }
    function addUser() {
        if (totalRoles.includes(userText) || /^\s*$/.test(userText)) {
            return;
        } else {
            setTotalRoles([...totalRoles, userText]);
            setUserText("");
        }
    }

    function removeUser() {
        if (userText === "League Manager" || userText === "Team Manager") {
            return;
        }
        const bool = totalRoles.some(
            (name: string): boolean => name === userText
        );
        if (bool === true) {
            const num = totalRoles.indexOf(userText);
            totalRoles.splice(num, 1);
            setTotalRoles([...totalRoles]);
            setUserText("");
        }
    }

    // This is the View
    return (
        <>
            <div>
                <div className="roleSelect">
                    <Form.Group controlId="Roles">
                        <Form.Label style={{ fontSize: 15, color: "white" }}>
                            Which role
                        </Form.Label>
                        <Form.Select value={role} onChange={updateRole}>
                            {totalRoles.map((role: string) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                            {/*}
                    <option value="Super">Super</option>
                    <option value="Admin">Admin</option>
                    <option value="User1">User1</option>
                    <option value="User2">User2</option>
                    {*/}
                        </Form.Select>
                    </Form.Group>
                </div>
                {role === "League Manager" ? (
                    <div className="AddingAndDeletingUsers">
                        <UserText
                            userText={userText}
                            setUserText={setUserText}
                        ></UserText>
                        <Button
                            className="AddOrDeleteUserButtons"
                            data-testid="addButton"
                            onClick={addUser}
                        >
                            Add This User
                        </Button>
                        <Button
                            className="AddOrDeleteUserButtons"
                            data-testid="delButton"
                            onClick={removeUser}
                        >
                            Delete This User
                        </Button>
                    </div>
                ) : (
                    <span></span>
                )}
            </div>
        </>
    );
}
