import React from "react";
import { Form } from "react-bootstrap";
import { Player } from "../interfaces/player";
import "../style.css";

export interface Filter {
    filterPosition: string[];
    playerList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
    name: string;
    filter: string;
    setFilter: (newValue: string) => void;
    setText: (newValue: string) => void;
}

export function UserPositionFilter({
    filterPosition,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    playerList,
    setFilteredList,
    name,
    filter,
    setFilter,
    setText
}: Filter): JSX.Element {
    //const [filter, setFilter] = useState<string>("None");

    function updateFilter(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value);
        if (
            event.target.value !== "None" &&
            event.target.value !== "Rating > 90"
        ) {
            // if being filtered by a position
            const tempPlayerList = playerList.filter(
                (player: Player): boolean =>
                    player.position === event.target.value
            );
            setFilteredList(tempPlayerList);
            setText("");
        } else if (event.target.value === "Rating > 90") {
            // if being filtered by rating
            const tempPlayerList = playerList.filter(
                (player: Player): boolean => player.rating >= 90
            );
            setFilteredList(tempPlayerList);
            setText("");
        } else {
            // if not being filtered by anything (resets lis)
            setFilteredList(playerList);
        }
    }

    return (
        <div className="userPositionFilter">
            <Form.Group>
                <Form.Label style={{ color: "white" }}>
                    Filter Buttons
                </Form.Label>
                <br></br>
                {filterPosition.map((choice: string) => (
                    <Form.Check
                        inline
                        type="radio"
                        name={name}
                        onChange={updateFilter}
                        key={choice}
                        style={{ color: "white" }}
                        label={choice}
                        value={choice}
                        checked={choice === filter}
                        data-testid={"filter" + choice}
                    />
                ))}
            </Form.Group>
        </div>
    );
}

export default UserPositionFilter;
