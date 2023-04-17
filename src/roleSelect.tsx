import React from "react";
import { Form } from "react-bootstrap";
interface Roles {
    setRole: (newString: string) => void;
    role: string;
}
export function RoleSelect({ setRole, role }: Roles): JSX.Element {
    //const [role, setRole] = useState<string>("Super");

    function updateRole(event: React.ChangeEvent<HTMLSelectElement>) {
        setRole(event.target.value);
    }

    // This is the View
    return (
        <div>
            <Form.Group controlId="Roles">
                <Form.Label>What role would you like to pick?</Form.Label>
                <Form.Select value={role} onChange={updateRole}>
                    <option value="Super">Super</option>
                    <option value="Admin">Admin</option>
                    <option value="User1">User1</option>
                    <option value="User2">User2</option>
                </Form.Select>
            </Form.Group>
            The Currently chosen role is: {role}.
        </div>
    );
}
