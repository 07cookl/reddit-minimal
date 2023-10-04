import React from 'react';
import styles from './Comments.module.css';

export default function Comments() {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentInfoContainer}>
                <p className={styles.icon}>Icon</p>
                <div className={styles.commentInfo}>
                    <p>Name</p>
                    <p>Time uploaded</p>
                </div>
            </div>
            <p>Comment</p>
            <div className={styles.social}>
                <ul>
                    <li>Votes</li>
                    <li>Share</li>
                </ul>
            </div>
            <p>View replies...</p>
        </div>
    )
}