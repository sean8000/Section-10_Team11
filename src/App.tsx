import React from "react";
// import Test from "./components/Test";
//import {roleSelect} from "./roleSelect"
import { Col, Container, Row } from "react-bootstrap";
import { RoleSelect } from "./roleSelect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SuperList } from "../src/components/SuperList";
import { UserList } from "../src/components/UserList";
// import playerBox from "./components/playerBox";
// import playerBucket from "./components/playerBucket";

function App(): JSX.Element {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <h1> This is our website</h1>
                <Container>
                    <Row>
                        <Col>
                            <h2> List 1: Central List</h2>
                            <SuperList></SuperList>
                        </Col>
                        <Col>
                            <h1> List 2: Admin List</h1>
                        </Col>
                        <Col>
                            <h1> List 3: Users List</h1>
                            <UserList></UserList>
                        </Col>
                        <Col>
                            <h2>Role Select</h2>
                            <RoleSelect></RoleSelect>
                        </Col>
                    </Row>
                </Container>
            </div>
        </DndProvider>
    );
}
export default App;
