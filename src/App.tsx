import React, { useState } from "react";
import Test from "./components/Test";
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from "./components/roleSelect";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("Super");
    const [widgets, setWidgets] = useState<string[]>([]);
    const [totalRoles, setTotalRoles] = useState<string[]>([
        "Super",
        "Admin",
        "User1"
    ]);

    {
        /*}
    function addUser() {
        setTotalRoles([...totalRoles, "User2"]);
    }
{*/
    }
    return (
        <div>
            <h1 className="heading">NFL Football TeamBuilder</h1>
            <h4 className="instructions">
                LEAGUE MANAGERS ----- ADD/REMOVE PLAYERS
            </h4>
            <h4 className="instructions">
                TEAM MANAGERS ----- EDIT YOUR PLAYERS
            </h4>
            <h4 className="instructions">
                TEAM BUILDERS ----- BUILD YOUR TEAM
            </h4>
            <Container>
                <Row>
                    <Col>
                        {role !== "Super" ? (
                            <Test
                                widgets={widgets}
                                setWidgets={setWidgets}
                                role={role}
                            ></Test>
                        ) : (
                            <span>
                                Central List, Added later when player list
                                created
                            </span>
                        )}
                    </Col>
                    <Col>
                        <h4>Role Select</h4>
                        <RoleSelect
                            setRole={setRole}
                            role={role}
                            setWidgets={setWidgets}
                            totalRoles={totalRoles}
                            setTotalRoles={setTotalRoles}
                        ></RoleSelect>
                        {/*}<Button onClick={() => addUser()}>Add User</Button>{*/}
                    </Col>
                </Row>
            </Container>
            <span>
                Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
        </div>
    );
}
export default App;
