import React from "react";
import styles from "./SubredditInfo.module.css";
import { useSelector } from "react-redux";

export default function SubredditInfo() {
    const reddit = useSelector((state) => state.reddit);
    const { subredditData } = reddit;

    if (subredditData === undefined || Object.keys(subredditData).length === 0) {
        return;
    };

    const url = `https://www.reddit.com${subredditData.url}`;

    return (
        <div className={styles.subredditInfo}>
            <img className={styles.headerImage} src={subredditData.header_img} alt="subreddit header" />
            <a className={styles.displayName} href={url}>{subredditData.display_name_prefixed}</a>
            <div className={styles.nameDescription}>
                <h3>{subredditData.title}</h3>
                <p>{subredditData.public_description}</p>
            </div>
            <p className={styles.subscribers}>{subredditData.subscribers} subscribers</p>
        </div>
    )
}