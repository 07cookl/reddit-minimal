import React from "react";
import styles from "./Header.module.css";
import { SearchBar } from "../SearchBar/SearchBar";

export default function Header(props) {
    return (
        <div className={styles.bar}>
            <div className={styles.logo}>
                <p>LOGO</p>
            </div>
            <SearchBar 
            onSearch={props.onSearch}
            previews={props.previews}
            onPreview={props.onPreview}
            />
        </div>
    )
}