import "./Test.css";
import React, { useState } from "react";
import { UserText } from "../UserText";
import { Form, Button } from "react-bootstrap";
interface Roles {
    setRole: (newString: string) => void;
    role: string;
    //widgets: string[];
    setWidgets: (newStringList: string[]) => void;
    totalRoles: string[];
    setTotalRoles: (newStringList: string[]) => void;
}
export function RoleSelect({
    setRole,
    role,
    //widgets,
    setWidgets,
    totalRoles,
    setTotalRoles
}: Roles): JSX.Element {
    //const [role, setRole] = useState<string>("Super");
    const [userText, setUserText] = useState<string>("");
    function updateRole(event: React.ChangeEvent<HTMLSelectElement>) {
        setRole(event.target.value);
        setWidgets([]);
    }
    function addUser() {
        setTotalRoles([...totalRoles, userText]);
    }

    // This is the View
    return (
        <div>
            <Form.Group className="instructions" controlId="Roles">
                <Form.Label>Which role</Form.Label>
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
            The Currently chosen role is: {role}.
            <UserText userText={userText} setUserText={setUserText}></UserText>
            <Button onClick={() => addUser()}>Add this User</Button>
        </div>
    );
}
