import React from "react";
import styles from "./Header.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { setSelectedSubreddit } from "../../app/redditSlice";

export default function Header() {
    const dispatch = useDispatch();
    
    const changeSubreddit = () => {
        dispatch(setSelectedSubreddit('r/popular'))
    };

    return (
        <div className={styles.bar}>
            <div className={styles.logo}>
                <p onClick={changeSubreddit}>LOGO</p>
            </div>
            <SearchBar />
        </div>
    )
}