//import { Player, Position } from "../interfaces/player";
import { Form } from "react-bootstrap";
import React, { useState } from "react";

interface Rating {
    initialRating: number;
}

export function UserRating({ initialRating }: Rating) {
    //Stats all automatically 1, rating automatically 1 considering they're a new player
    const [rating, setRating] = useState<number>(initialRating);
    // Provide forms for editing the new movie
    // And also a button to append the movie
    return (
        <div>
            <span> Overall Rating is: {rating}</span>
            <Form.Group className="playerRatingBox" controlId="PlayerRating">
                <Form.Label></Form.Label>
                <Form.Control
                    type="number"
                    value={rating}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        parseInt(event.target.value) >= 0 &&
                        parseInt(event.target.value) <= 100
                            ? setRating(parseInt(event.target.value) || 0)
                            : "";
                    }}
                />
            </Form.Group>
        </div>
    );
}
