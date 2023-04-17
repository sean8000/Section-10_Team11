import React from "react";
import Test from "./components/Test";
//import {roleSelect} from "./roleSelect"
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from "./roleSelect";

function App(): JSX.Element {
    return (
        <div>
            <h1> This is our website</h1>
            <span>
                Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
            <Test></Test>
            <Container>
                <Row>
                    <Col>
                        <h4>Role Select</h4>
                        <RoleSelect></RoleSelect>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default App;
