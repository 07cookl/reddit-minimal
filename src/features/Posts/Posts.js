import React from "react";
import styles from "./Posts.module.css";
import Comments from "../Comments/Comments";

export default function Posts(props) {
    return (
    <div className={styles.postContainer}>
        <div className={styles.postInfoContainer}>
            <p className={styles.icon}>Icon</p>
            <div className={styles.postInfo}>
                <ul>
                    <li>
                        <p>r/{props.post.subreddit}</p>
                    </li>
                    <li>
                        <p>by {props.post.author}</p>
                    </li>
                    <li>
                        <p>time uploaded</p>
                    </li>
                </ul>
            </div>
        </div>
        <h2>{props.post.title}</h2>
        <div className={styles.image}>
            <p>{props.post.selftext}</p>
        </div>
        <div className={styles.social}>
            <ul>
                <li>
                    <p>{props.post.score}</p>
                </li>
                <li>
                    <p>{props.post.num_comments}</p>
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