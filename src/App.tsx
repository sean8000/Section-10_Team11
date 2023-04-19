import React, { useState } from "react";
import Test from "./components/Test";
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from "./components/roleSelect";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("Super");
    const [widgets, setWidgets] = useState<string[]>([]);
    return (
        <div>
            <h1 className="heading">
                <div className="rockwell">NFL Football TeamBuilder</div>
            </h1>
            <RoleSelect
                setRole={setRole}
                role={role}
                setWidgets={setWidgets}
            ></RoleSelect>
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
                </Row>
            </Container>
            <h3 className="instructions">
                League Managers: add or remove players
            </h3>
            <span>
                Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
        </div>
    );
}
export default App;
