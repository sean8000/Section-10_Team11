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
    name
}: SortFilter): JSX.Element {
    return (
        <div className="sortFilterBox">
            <UserPositionFilter
                filterPosition={filterPositions}
                playerList={playerList}
                setFilteredList={setFilteredList}
                name={name}
            ></UserPositionFilter>
            <SortSelect
                sortOption={sortOption}
                setSortOption={setSortOption}
                playerList={filteredList ?? []}
                setPlayerList={setFilteredList ?? []}
            ></SortSelect>
            <SearchTextBox
                searchText={searchText}
                setSearchText={setSearchText}
                userFilteredList={filteredList}
                setUserFilteredList={setFilteredList}
                widgetList={playerList}
                name={name}
            ></SearchTextBox>
        </div>
    );
}

{
    /* <SearchTextBox
                            searchText={searchText}
                            setSearchText={setSearchText}
                            userFilteredList={userFilteredList}
                            setUserFilteredList={setUserFilteredList}
                            widgetList={widgets}
                        ></SearchTextBox>
                        <CentralPositionFilter
                            filterPosition={filterPositions}
                            playerList={widgets}
                            setFilteredList={setUserFilteredList}
                        ></CentralPositionFilter>
                        <SortSelect
                            sortOption={userSort}
                            setSortOption={setUserSort}
                            playerList={userFilteredList ?? []}
                            setPlayerList={setUserFilteredList ?? []}
                        ></SortSelect> */
}
