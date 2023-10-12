import React from "react";
import styles from "./SubredditInfo.module.css";
import { useSelector } from "react-redux";

export default function SubredditInfo() {
    const reddit = useSelector((state) => state.reddit);
    const { subredditData } = reddit;

    if (subredditData === undefined || Object.keys(subredditData).length === 0) {
        return;
    };

    return (
        <div className={styles.subredditInfo}>
            <img src={subredditData.header_img} alt="subreddit header" />
            <h2>{subredditData.display_name_prefixed}</h2>
            <h3>{subredditData.title}</h3>
            <p>{subredditData.public_description}</p>
            <p>{subredditData.subscribers} subscribers</p>
        </div>
    )
}