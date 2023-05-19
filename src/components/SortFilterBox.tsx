import React from "react";
import { SortSelect } from "./sortSelect";
import { UserPositionFilter } from "./UserPositionFilter";
import { SearchTextBox } from "./SearchTextBox";
import { Player } from "../interfaces/player";
import "../style.css";

interface SortFilter {
    playerList: Player[];

    filteredList: Player[];
    setFilteredList: (newPlayerList: Player[]) => void;
    filterPositions: string[];

    sortOption: string;
    setSortOption: (newString: string) => void;

    searchText: string;
    setSearchText: (newString: string) => void;

    name: string;

    labelText: string;

    setFilterOption: (newString: string) => void;

    filterOption: string;
}

export function SortFilterBox({
    playerList,
    filteredList,
    setFilteredList,
    filterPositions,
    sortOption,
    setSortOption,
    searchText,
    setSearchText,
    name,
    labelText,
    filterOption,
    setFilterOption
}: SortFilter): JSX.Element {
    // this is primarily a handler for the sub componants to reduce code
    return (
        <div className="sortFilterBox">
            <SearchTextBox
                searchText={searchText}
                setSearchText={setSearchText}
                userFilteredList={filteredList}
                setUserFilteredList={setFilteredList}
                widgetList={playerList}
                name={name}
                labelText={labelText}
                setFilterOption={setFilterOption}
            ></SearchTextBox>
            <UserPositionFilter
                filter={filterOption}
                setFilter={setFilterOption}
                filterPosition={filterPositions}
                playerList={playerList}
                setFilteredList={setFilteredList}
                name={name}
                setText={setSearchText}
            ></UserPositionFilter>
            <SortSelect
                sortOption={sortOption}
                setSortOption={setSortOption}
                playerList={filteredList ?? []}
                setPlayerList={setFilteredList ?? []}
            ></SortSelect>
        </div>
    );
}
