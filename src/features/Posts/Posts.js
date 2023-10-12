import React from "react";
import styles from "./Posts.module.css";
import Comment from "../Comments/Comments";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch } from "react-redux";
import { setSelectedSubreddit } from "../../app/redditSlice";
import timeSince from "../../util/timeSince";
import unEscape from "../../util/unEscape";
import randomAvatar from "../../util/randomAvatar";

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
                return <Markdown remarkPlugins={[remarkGfm]} className={styles.postText}>{unEscape(post.selftext)}</Markdown>;
            case 'link':
                return (
                    <div className={styles.thumbnail}>
                    <img src={post.thumbnail} alt="post thumbnail" />
                    <a href={post.url}>{post.url}</a>
                    </div>
                );
            case 'image':
                return <img src={post.url} className={styles.postImage} alt={post.title}/>
            case 'hosted:video':
                return (<video controls height="350">
                    <source src={post.media.reddit_video.scrubber_media_url}/>
                </video>);
            case undefined:
                if (post.thumbnail === 'self') {
                    return <Markdown remarkPlugins={[remarkGfm]} className={styles.postText}>{unEscape(post.selftext)}</Markdown>;
                };
                if (!post.thumbnail) {
                    return <a href={post.url}>Click for more</a>
                } else if (post.thumbnail.includes('http')) {
                    return <img src={post.thumbnail} alt="post thumbnail" />
                } else {
                    return;
                }
            default:
                <p>Unable to load post.</p>;
        }
    }

    const avatar = () => {
        return randomAvatar[props.index % 10];
    }

    // let currentComments = 4;
    
    const renderComments = () => {
        if (props.post.errorComments) {
            return (
                <p>Unable to load comments.</p>
            )
        }

        if (props.post.loadingComments) {
            return (
                <p>Loading comments...</p>
            )
        }

        const comments = props.post.comments.slice(0,10).filter((comment) => !comment.body.includes('![gif]'));

        if (props.post.showingComments) {
            return (
                <div>
                    {comments.slice(0,10).map((comment) => (
                    <Comment comment={comment} key={comment.id} avatar={avatar()}/>
                    ))}
                    {/* <button className={styles.showMoreBtn} onClick={() => currentComments += 4}>Show more comments</button> */}
                </div>
            );
        }
    }

    return (
    <div className={styles.postContainer}>
        <div className={styles.postInfoContainer}>
            <img className={styles.icon} src={avatar()} alt="avatar for post"/>
            <div className={styles.postInfo}>
                <ul>
                    <li>
                        <p className={styles.link} onClick={changeSubreddit}>r/{props.post.subreddit}</p>
                    </li>
                    <li>
                        <p>by {props.post.author}</p>
                    </li>
                    <li>
                        <p>uploaded {timeSince(Date.now() - props.post.created_utc * 1000)}</p>
                    </li>
                </ul>
            </div>
        </div>
        <a className={styles.postTitle} href={props.post.url}>{props.post.title}</a>
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
        {renderComments()}
            <button onClick={() => props.onToggleComments(props.post.permalink)}>{props.post.showingComments ? 'Hide comments' : 'Show comments'}</button>
        </div>
    </div>
    )
}