import React from "react";
import styles from "./Posts.module.css";
import Comments from "../Comments/Comments";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Posts(props) {

    const postContent = (post) => {
        let category = post.post_hint;
        switch (category) {
            case 'self':
                return <Markdown remarkPlugins={[remarkGfm]} className={styles.postText}>{post.selftext}</Markdown>;
            case 'link':
                return <a href={post.url}>Click for more</a>;
            case 'image':
                return <img src={post.url} className={styles.postImage} alt={post.title}/>
            case 'hosted:video':
                return (<video controls height="350">
                    <source src={props.post.media.reddit_video.scrubber_media_url}/>
                </video>);
            case undefined:
                return <a href={post.url}>Click for more</a>;
            default:
                <p>Unable to load post.</p>;
        }
    }

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
        <div className={styles.content}>
            {postContent(props.post)}
        </div>
        <div className={styles.social}>
            <ul>
                <li>
                    <p>Score: {props.post.score}</p>
                </li>
                <li>
                    <p>{props.post.num_comments} comments</p>
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