import React, { useState } from "react";
import Test from "./components/Test";
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from "./roleSelect";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("Super");
    const [myMap, setMyMap] = useState(new Map());
    const [widgets, setWidgets] = useState<string[]>([]);
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
            <h1> This is our website, Can it finally deploy please?</h1>
            <span>
                Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
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
                        {/*}<Button onClick={() => addUser()}>Add User</Button>{*/}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default App;
