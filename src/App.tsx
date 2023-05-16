/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import DragAndDisplay from "./components/DragAndDisplay";
import { SuperAdminEdit } from "./components/SuperAdminEdit";
import { UserEdit } from "./components/UserEdit";
import { RoleSelect } from "./components/roleSelect";
import { Player } from "./interfaces/player";
import { playerList } from "./players";
//import { Button } from "react-bootstrap";
import { EditAdminButton } from "./components/visibilityButtons/EditAdminButton";
import { EditSuperButton } from "./components/visibilityButtons/EditSuperButton";
import { EditUserButton } from "./components/visibilityButtons/EditUserButton";
//import { AddPlayers } from "./components/AddPlayers";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("League Manager");
    const [myMap, setMyMap] = useState(new Map());
    const [centralList, setCentralList] = useState<Player[]>(playerList);
    const [filteredList, setFilteredList] = useState<Player[]>(playerList);
    const [widgets, setWidgets] = useState<Player[]>([]);
    const [userFilteredList, setUserFilteredList] = useState<Player[]>([]);
    const [adminWidgets, setAdminWidgets] = useState<Player[]>([]);
    const [totalRoles, setTotalRoles] = useState<string[]>([
        "League Manager",
        "Team Manager",
        "Guest User"
    ]);
    const [adminEdit, setAdminEdit] = useState<boolean>(false);
    const [superEdit, setSuperEdit] = useState<boolean>(false);
    const [userEdit, setUserEdit] = useState<boolean>(false);
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
            <span className="names">
                by Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
            <h1 className="heading">
                <>
                    {" "}
                    {"NFL Football TeamBuilder"}
                    <br></br>
                    {"Drag or Click Player Icons to Put Them on Your Team"}
                </>
                <RoleSelect
                    setRole={setRole}
                    role={role}
                    widgets={widgets}
                    setWidgets={setWidgets}
                    adminWidgets={adminWidgets}
                    setAdminWidgets={setAdminWidgets}
                    totalRoles={totalRoles}
                    setTotalRoles={setTotalRoles}
                    myMap={myMap}
                    setMyMap={setMyMap}
                    setAdminEdit={setAdminEdit}
                    setSuperEdit={setSuperEdit}
                    setUserEdit={setUserEdit}
                    setUserFilteredList={setUserFilteredList}
                ></RoleSelect>
                <EditAdminButton
                    visibilty={adminEdit}
                    setVisibility={setAdminEdit}
                    role={role}
                    widgets={adminWidgets}
                    centralList={centralList}
                    setCentralList={setCentralList}
                    filteredList={filteredList}
                    setFilteredList={setFilteredList}
                ></EditAdminButton>
                <EditSuperButton
                    visibilty={superEdit}
                    setVisibility={setSuperEdit}
                    role={role}
                    setFilteredList={setFilteredList}
                    centralList={centralList}
                ></EditSuperButton>
                <EditUserButton
                    visibilty={userEdit}
                    setVisibility={setUserEdit}
                    role={role}
                    setUserFilteredList={setUserFilteredList}
                    widgetList={widgets}
                ></EditUserButton>
            </h1>
            {adminEdit !== true && superEdit !== true && userEdit !== true ? (
                <DragAndDisplay
                    widgets={widgets}
                    setWidgets={setWidgets}
                    role={role}
                    myMap={myMap}
                    setMyMap={setMyMap}
                    centralList={centralList}
                    setCentralList={setCentralList}
                    adminWidgets={adminWidgets}
                    setAdminWidgets={setAdminWidgets}
                    filteredList={filteredList}
                    setFilteredList={setFilteredList}
                    userFilteredList={userFilteredList}
                    setUserFilteredList={setUserFilteredList}
                ></DragAndDisplay>
            ) : adminEdit === true ? (
                <SuperAdminEdit
                    role={role}
                    adminWidgets={adminWidgets}
                    setAdminWidgets={setAdminWidgets}
                ></SuperAdminEdit>
            ) : superEdit === true ? (
                <SuperAdminEdit
                    role={role}
                    adminWidgets={centralList}
                    setAdminWidgets={setCentralList}
                ></SuperAdminEdit>
            ) : userEdit === true ? (
                <UserEdit
                    role={role}
                    adminWidgets={widgets}
                    setAdminWidgets={setWidgets}
                ></UserEdit>
            ) : (
                ""
            )}
            {/*}
                        {role !== "League Manager" ? (
                            <DragAndDisplay
                                widgets={widgets}
                                setWidgets={setWidgets}
                                role={role}
                                myMap={myMap}
                                setMyMap={setMyMap}
                            ></DragAndDisplay>
                        ) : (
                            <span>
                                Central List, Added later when player list
                                created
                            </span>
                        )}
                        {*/}
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
            <div className="padding"></div>
        </div>
    );
}
export default App;
