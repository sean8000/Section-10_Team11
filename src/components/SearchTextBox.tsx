import React from "react";
import { Form } from "react-bootstrap";
import "../style.css";
import { Player } from "../interfaces/player";
interface Users {
    searchText: string;
    setSearchText: (newString: string) => void;
    widgetList: Player[];
    userFilteredList: Player[];
    setUserFilteredList: (newPlayerList: Player[]) => void;
    name: string;
    labelText: string;
}
export function SearchTextBox({
    searchText,
    setSearchText,
    userFilteredList,
    setUserFilteredList,
    widgetList,
    name,
    labelText
}: Users): JSX.Element {
    // This is the Control
    function updateText(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
        if (event.target.value != "") {
            const tempPlayerList = userFilteredList.filter(
                (player: Player): boolean =>
                    player.description.includes(event.target.value)
            );
            setUserFilteredList(tempPlayerList);
        } else {
            setUserFilteredList(widgetList);
        }
    }

    // This is the View
    return (
        <div className="filterTextBox">
            <Form.Group data-testid="StringSearch" controlId="String Search">
                <Form.Label style={{ color: "white" }}>{labelText}:</Form.Label>
                <Form.Control
                    value={searchText}
                    onChange={updateText}
                    name={name}
                />
            </Form.Group>
        </div>
    );
}
