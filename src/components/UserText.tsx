import React from "react";
import { Form } from "react-bootstrap";
import "../style.css";
interface Users {
    userText: string;
    setUserText: (newString: string) => void;
}
export function UserText({ userText, setUserText }: Users): JSX.Element {
    // This is the Control
    function updateText(event: React.ChangeEvent<HTMLInputElement>) {
        setUserText(event.target.value);
    }

    // This is the View
    return (
        <div className="addUserBox">
            <Form.Group data-testid="usertext" controlId="UserTextBox">
                <Form.Label style={{ fontSize: 15, color: "white" }}>
                    Your User Name:
                </Form.Label>
                <Form.Control value={userText} onChange={updateText} />
            </Form.Group>
        </div>
    );
}
