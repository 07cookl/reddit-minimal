import React from "react";
import styles from "./Posts.module.css";
import Comments from "../Comments/Comments";

export default function Posts() {
    return (
    <div className={styles.postContainer}>
        <div className={styles.postInfoContainer}>
            <p className={styles.icon}>Icon</p>
            <div className={styles.postInfo}>
                <ul>
                    <li>
                        <p>r/category</p>
                    </li>
                    <li>
                        <p>by author</p>
                    </li>
                    <li>
                        <p>time uploaded</p>
                    </li>
                </ul>
            </div>
        </div>
        <h2>Headline</h2>
        <div className={styles.image}>
            <p>Image/Link to article</p>
        </div>
        <div className={styles.social}>
            <ul>
                <li>
                    <p>Votes</p>
                </li>
                <li>
                    <p>Comments</p>
                </li>
                <li>
                    <p>Share</p>
                </li>
            </ul>
        </div>
        <div className={styles.comments}>
        <Comments />
        </div>
    </div>
    )
}