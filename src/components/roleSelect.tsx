import "./Test.css";
import React, { useState } from "react";
import { UserText } from "../UserText";
import { Form, Button } from "react-bootstrap";
import { Player } from "../interfaces/player";

interface Roles {
    setRole: (newString: string) => void;
    role: string;
    setWidgets: (newStringList: Player[]) => void;
    totalRoles: string[];
    setTotalRoles: (newStringList: string[]) => void;
    myMap: Map<string, Player[]>;
    //setMyMap: (newMap: Map<string, Player[]>) => void;
}
export function RoleSelect({
    setRole,
    role,
    myMap,
    setWidgets,
    totalRoles,
    setTotalRoles
}: Roles): JSX.Element {
    //const [role, setRole] = useState<string>("Super");
    const [userText, setUserText] = useState<string>("");
    function updateRole(event: React.ChangeEvent<HTMLSelectElement>) {
        setRole(event.target.value);
        setWidgets(myMap.get(event.target.value) ?? []);
    }
    function addUser() {
        setTotalRoles([...totalRoles, userText]);
        setUserText("");
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
        <div className="roleSelect">
            <Form.Group controlId="Roles">
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
            {role === "League Manager" ? (
                <div className="addUserBox">
                    <UserText
                        userText={userText}
                        setUserText={setUserText}
                    ></UserText>
                    <br></br>
                    <Button
                        style={{ backgroundColor: "#000000" }}
                        data-testid="addButton"
                        onClick={addUser}
                    >
                        Add This User
                    </Button>
                    <Button
                        style={{ backgroundColor: "#000000" }}
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
    );
}
