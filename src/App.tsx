import React, { useState } from "react";
import Test from "./components/Test";
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from ".//components/roleSelect";
import { Player } from "./interfaces/player";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("Super");
    const [myMap, setMyMap] = useState(new Map());
    const [widgets, setWidgets] = useState<Player[]>([]);
    const [totalRoles, setTotalRoles] = useState<string[]>([
        "Super",
        "Admin",
        "User1"
    ]);
    //const [userDict, setDict] = useState<Record<string, string[]>>({});
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
            <h5 className="instructions">
                LEAGUE MANAGERS ----- ADD/REMOVE PLAYERS
            </h5>
            <h5 className="instructions">
                TEAM MANAGERS ----- EDIT YOUR PLAYERS
            </h5>
            <h5 className="instructions">
                TEAM BUILDERS ----- BUILD YOUR TEAM
            </h5>
            <h4 className="roleSelectHeadings">Role Select</h4>
            <RoleSelect
                setRole={setRole}
                role={role}
                setWidgets={setWidgets}
                totalRoles={totalRoles}
                setTotalRoles={setTotalRoles}
                myMap={myMap}
            ></RoleSelect>
            <Container>
                <Row>
                    <Col>
                        {role !== "Super" ? (
                            <Test
                                widgets={widgets}
                                setWidgets={setWidgets}
                                role={role}
                                myMap={myMap}
                                setMyMap={setMyMap}
                            ></Test>
                        ) : (
                            <span>
                                Central List, Added later when player list
                                created
                            </span>
                        )}
                    </Col>
                    {/*}
                    <Col>
                        <h4>Role Select</h4>
                        <RoleSelect
                            setRole={setRole}
                            role={role}
                            widgets={widgets}
                            setWidgets={setWidgets}
                            totalRoles={totalRoles}
                            setTotalRoles={setTotalRoles}
                            myMap={myMap}
                            setMyMap={setMyMap}
                        ></RoleSelect>
                        {/*}<Button onClick={() => addUser()}>Add User</Button>{
                    </Col>
                    */}
                </Row>
            </Container>
            <span className="names">
                Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
            <div className="padding"></div>
        </div>
    );
}
export default App;
