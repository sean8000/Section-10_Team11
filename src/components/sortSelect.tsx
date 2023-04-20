import "./Test.css";
import React, { useState } from "react";
import { UserText } from "../UserText";
import { Form, Button } from "react-bootstrap";
import { Player } from "../interfaces/player";
import { string } from "yargs";

export interface Sort {
    sortOption: string;
    setSortOption: (newString: string) => void;
}
export function SortSelect({ sortOption, setSortOption }: Sort): JSX.Element {
    const OPTIONS = ["None", "Positions", "Rating", "Touchdowns"];

    function updateSort(event: React.ChangeEvent<HTMLSelectElement>) {
        setSortOption(event.target.value);
    }
    return (
        <div className="sortSelect">
            <Form.Group controlId="Sort">
                <Form.Label className="sortSelectHeading"></Form.Label>
                <Form.Select value={sortOption} onChange={updateSort}>
                    {OPTIONS.map((OPTION: string) => (
                        <option key={OPTION} value={OPTION}>
                            {OPTION}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
