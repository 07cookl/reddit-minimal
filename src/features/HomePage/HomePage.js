import React from "react";
import styles from "./HomePage.module.css";
import Posts from "../Posts/Posts";

export default function HomePage() {
    return (
    <div className={styles.homeContainer}>
        <p>This will be the home page.</p>
        <div className={styles.posts}>
            <Posts />
        </div>
    </div>
    )
}