/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import Test from "./components/Test";
import { AdminEdit } from "./components/AdminEdit";
import { RoleSelect } from "./components/roleSelect";
import { Player } from "./interfaces/player";
import { playerList } from "./players";
import { Button } from "react-bootstrap";
//import { AddPlayers } from "./components/AddPlayers";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("League Manager");
    const [myMap, setMyMap] = useState(new Map());
    const [centralList, setCentralList] = useState<Player[]>(playerList);
    const [filteredList, setFilteredList] = useState<Player[]>(playerList);
    const [widgets, setWidgets] = useState<Player[]>([]);
    const [adminWidgets, setAdminWidgets] = useState<Player[]>([]);
    const [totalRoles, setTotalRoles] = useState<string[]>([
        "League Manager",
        "Team Manager",
        "Guest User"
    ]);
    const [adminEdit, setAdminEdit] = useState<boolean>(false);
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
            <h1 className="heading">
                {role === "League Manager" ? (
                    <>
                        <br></br>
                        {"NFL Football TeamBuilder"}
                        <br></br>
                        {"Drag or Click Player Icons to Put Them on Your Team"}
                        <br></br>
                        <br></br>
                    </>
                ) : (
                    <>
                        {" "}
                        {"NFL Football TeamBuilder"}
                        <br></br>
                        {"Drag or Click Player Icons to Put Them on Your Team"}
                    </>
                )}
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
                ></RoleSelect>
                {role === "Team Manager" && adminEdit === false ? (
                    <div>
                        <Button
                            onClick={() => {
                                {
                                    setMyMap(
                                        myMap.set("Team Manager", adminWidgets)
                                    );
                                    setAdminWidgets(
                                        myMap.get("Team Manager") ?? []
                                    );
                                    console.log("map value below");
                                    console.log(myMap.get("Team Manager"));
                                }
                                setAdminEdit(!adminEdit);
                            }}
                        >
                            {" "}
                            Edit your players
                        </Button>
                    </div>
                ) : role === "Team Manager" && adminEdit === true ? (
                    <Button
                        onClick={() => {
                            const newList = centralList.map((curr: Player) => {
                                const foundElem = adminWidgets.find(
                                    (other: Player): boolean =>
                                        curr.original === other.original
                                );
                                if (foundElem !== undefined) {
                                    console.log("This elem" + foundElem);
                                    return foundElem;
                                } else {
                                    console.log("Elem not found");
                                    return curr;
                                }
                            });
                            console.log(newList);
                            setCentralList([...newList]);
                            setFilteredList([...newList]);
                            setAdminEdit(false);
                        }}
                    >
                        {" "}
                        Save your list to central and backout
                    </Button>
                ) : (
                    ""
                )}
            </h1>
            {adminEdit !== true ? (
                <Test
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
                ></Test>
            ) : (
                <AdminEdit
                    role={role}
                    adminWidgets={adminWidgets}
                    setAdminWidgets={setAdminWidgets}
                ></AdminEdit>
            )}
            {/*}
                        {role !== "League Manager" ? (
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
            <span className="names">
                Alexander Marshall, Michael Murphy, Sean Johnson, Michael
                Lorang, Dean Turner
            </span>
            <div className="padding"></div>
        </div>
    );
}
export default App;
