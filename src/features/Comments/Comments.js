import React from 'react';
import styles from './Comments.module.css';
import timeSince from '../../util/timeSince';
import unEscape from '../../util/unEscape';

export default function Comments( { comment, avatar }) {
    // const avatar = randomAvatar[Math.floor(Math.random()*10)];

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentInfoContainer}>
            <img className={styles.icon} src={avatar} alt="avatar for comment" />
                <div className={styles.commentInfo}>
                    <p>{comment.author}</p>
                    <p>uploaded {timeSince(Date.now() - comment.created_utc*1000)}</p>
                </div>
            </div>
            <p className={styles.commentBody}>{unEscape(comment.body)}</p>
            <div className={styles.social}>
                <ul>
                    <li>Score: {Comments.score ? Comments.score : 0}</li>
                </ul>
            </div>
        </div>
    )
}