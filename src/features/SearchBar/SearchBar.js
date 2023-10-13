import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, showPreviews, hidePreviews } from "../../app/redditSlice";
import { SearchPreview } from "../SearchPreview/SearchPreview";
import styles from "./SearchBar.module.css";
import searchImg from "../../resources/search.png";

export function SearchBar() {
    const reddit = useSelector((state) => state.reddit);
    const { searchTerm, showingPreviews } = reddit;
    const dispatch = useDispatch();
    const [searchTermLocal, setSearchTermLocal] = useState('');

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
        dispatch(showPreviews());
    };

    window.onclick = function(event) {
        if (showingPreviews) {
            if (!event.target.matches('.allSearch')) {
                dispatch(hidePreviews());
            }
        }
    };

    const handlePreviewsClick = (event) => {
        if (!showingPreviews)
        dispatch(showPreviews());
        event.stopPropagation();
    }

    return (
        <div id="allSearch" className={styles.container}>
            <div 
            id="searchBar" 
            className={styles.searchBar}
            onClick={handlePreviewsClick}>
                    <input 
                        onChange={({target}) => setSearchTermLocal(target.value)} 
                        value={searchTermLocal} 
                        className={styles.input} 
                        id="search" 
                        placeholder="Search" 
                        onKeyDown={(e) => e.key === "Enter" ? document.getElementById("button").click() : ''} 
                    />
                    <img className={styles.buttonSubmit} id="button" src={searchImg} onClick={handleSearch} alt="search icon" />
            </div>
            <SearchPreview />
        </div>
    )
}