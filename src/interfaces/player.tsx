/** A representation of a Player */
export type Position = "QB" | "RB" | "WR" | "TE" | "K";

export interface Player {
    // name of the player
    name: string;
    // short description (team, position)
    description: string;
    // url/path to player picture
    image: string;
    // player's position
    position: Position;
    // some statistics as a dict
    stats: {
        touchdowns: number;
        receptions: number;
        rushAttempts: number;
        totalYards: number;
    };
    // overall rating (1-100)
    rating: number;
    original: string;
}
