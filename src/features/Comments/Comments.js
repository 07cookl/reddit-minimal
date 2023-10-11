import React from 'react';
import styles from './Comments.module.css';
import timeSince from '../../util/timeSince';

export default function Comments( { comment }) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentInfoContainer}>
                <p className={styles.icon}>Icon</p>
                <div className={styles.commentInfo}>
                    <p>{comment.author}</p>
                    <p>uploaded {timeSince(Date.now() - comment.created_utc*1000)}</p>
                </div>
            </div>
            <p className={styles.commentBody}>{comment.body}</p>
            <div className={styles.social}>
                <ul>
                    <li>Score: {Comments.score ? Comments.score : 0}</li>
                </ul>
            </div>
        </div>
    )
}