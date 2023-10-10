import React from "react";
import styles from "./Posts.module.css";
import Comment from "../Comments/Comments";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch } from "react-redux";
import { setSelectedSubreddit, toggleShowingComments } from "../../app/redditSlice";

export default function Posts(props) {

    const dispatch = useDispatch();
    
    const changeSubreddit = () => {
        dispatch(setSelectedSubreddit(`r/${props.post.subreddit}`))
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${props.post.url}&text=${props.post.title}&via=`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${props.post.url}`,
        whatsapp: `whatsapp://send?text=${props.post.url}`
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(props.post.url);
        alert('Link copied!');
    };

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
                    <source src={post.media.reddit_video.scrubber_media_url}/>
                </video>);
            case undefined:
                return <a href={post.url}>Click for more</a>;
            default:
                <p>Unable to load post.</p>;
        }
    }

    const renderComments = () => {
        if (props.post.showingComments) {
            return (
                <div>
                    {props.post.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                    ))}
                </div>
            );
        }
    }

    return (
    <div className={styles.postContainer}>
        <div className={styles.postInfoContainer}>
            <p className={styles.icon}>Icon</p>
            <div className={styles.postInfo}>
                <ul>
                    <li>
                        <p className={styles.link} onClick={changeSubreddit}>r/{props.post.subreddit}</p>
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
                    <ul>
                        <li><a href={shareLinks.facebook} target="_blank" rel="nofollow noreferrer">Share on Facebook</a></li>
                        <li><a href={shareLinks.twitter} target="_blank" rel="nofollow noreferrer">Share on Twitter</a></li>
                        <li><a href={shareLinks.whatsapp} target="_blank" rel="nofollow noreferrer">Share on Whatsapp</a></li>
                        <li className={styles.link} onClick={handleCopy}>Copy Link</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className={styles.comments}>
            <button onClick={props.onToggleComments(props.post.permalink)}>Toggle Comments</button>
            {renderComments}
        </div>
    </div>
    )
}