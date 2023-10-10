import React from 'react';
import styles from './Comments.module.css';

export default function Comments( { comment }) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentInfoContainer}>
                <p className={styles.icon}>Icon</p>
                <div className={styles.commentInfo}>
                    <p>{comment.author}</p>
                    <p>Time uploaded</p>
                </div>
            </div>
            <p>{comment.body}</p>
            <div className={styles.social}>
                <ul>
                    <li>Score: {Comments.score}</li>
                </ul>
            </div>
            {/* <p onClick={toggleReplies}>View replies...</p> */}
        </div>
    )
}