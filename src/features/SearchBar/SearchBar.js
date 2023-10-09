import React from "react";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { SearchPreview } from "../SearchPreview/SearchPreview";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, setSelectedSubreddit } from "../../app/redditSlice";

export function SearchBar() {
    const reddit = useSelector((state) => state.reddit);
    const { searchTerm } = reddit;
    const dispatch = useDispatch();
    const [searchTermLocal, setSearchTermLocal] = useState('');

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    };

    return (
    <div className={styles.container}>
        <form onSubmit={handleSearch}>
            <input 
                onChange={({target}) => setSearchTermLocal(target.value)} 
                value={searchTermLocal} 
                className={styles.input} 
                id="search" 
                placeholder="Search" 
                onKeyDown={(e) => e.key === "Enter" ? document.getElementById("button").click() : ''} 
            />
            <button className={styles.buttonSubmit} id="button" onClick={handleSearch}>Submit</button>
        </form>
        <SearchPreview />
    </div>
    )
}