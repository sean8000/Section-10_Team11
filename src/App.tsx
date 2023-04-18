import React, { useState } from "react";
import Test from "./components/Test";
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from "./roleSelect";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("Super");
    const [widgets, setWidgets] = useState<string[]>([]);
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
                        ></RoleSelect>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default App;
