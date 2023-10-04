import React from "react";
import styles from "./SearchBar.module.css";

export function SearchBar() {
    return (
    <div className={styles.container}>
        <div className={styles.icon}>
            <p>icon</p>
        </div>
        <div className={styles.input}>
            <p>Search here</p>
        </div>
    </div>
    )
}