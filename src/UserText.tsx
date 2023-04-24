import React from "react";
import { Form } from "react-bootstrap";
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
        <div>
            <Form.Group controlId="UserTextBox">
                <Form.Label>User Name: {userText}</Form.Label>
                <Form.Control value={userText} onChange={updateText} />
            </Form.Group>
        </div>
    );
}
