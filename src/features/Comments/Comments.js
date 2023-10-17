import React from 'react';
import styles from './Comments.module.css';
import timeSince from '../../util/timeSince';
import unEscape from '../../util/unEscape';

export default function Comments( { comment, avatar }) {

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentInfoContainer}>
            <img className={styles.icon} src={avatar} alt="avatar for comment" />
                <div className={styles.commentInfo}>
                    <p>{comment.author}</p>
                    <p className={styles.timeSince}>uploaded {timeSince(Date.now() - comment.created_utc*1000)}</p>
                </div>
            </div>
            <p className={styles.commentBody}>{unEscape(comment.body)}</p>
            {/* <div className={styles.social}>
                <p>Score: {Comments.score ? Comments.score : 0}</p>
            </div> */}
        </div>
    )
}