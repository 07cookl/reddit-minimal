import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedSubreddit } from "../../app/redditSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./Header.module.css";

export default function Header() {
    const dispatch = useDispatch();
    
    const changeSubreddit = () => {
        dispatch(setSelectedSubreddit('r/popular'))
    };

    return (
        <div className={styles.bar}>
            <div className={styles.logo}>
                <p onClick={changeSubreddit}>Reddit <span>Minimal</span></p>
            </div>
            <SearchBar />
        </div>
    )
}