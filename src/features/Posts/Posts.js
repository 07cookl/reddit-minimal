import React from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import { changeNumberOfComments, setSelectedSubreddit } from "../../app/redditSlice";
import randomAvatar from "../../util/randomAvatar";
import timeSince from "../../util/timeSince";
import unEscape from "../../util/unEscape";
import Comment from "../Comments/Comments";
import styles from "./Posts.module.css";
import ModalImage from "react-modal-image";
import commentImage from "../../resources/6249783011585492607.svg";

export default function Posts(props) {
    const reddit = useSelector((state) => state.reddit);
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

    const postTextContent = (post) => {
        let category = post.post_hint;
        switch (category) {
            case 'self':
                return <Markdown remarkPlugins={[remarkGfm]} className={styles.postText}>{unEscape(post.selftext)}</Markdown>;
            case undefined:
                if (post.thumbnail === 'self') {
                    return <Markdown remarkPlugins={[remarkGfm]} className={styles.postText}>{unEscape(post.selftext)}</Markdown>;
                };
                if (!post.thumbnail) {
                    return <a href={post.url}>Click for more</a>
                } else {
                    return;
                }
            default:
                <p>Unable to load post.</p>;
        }
    }

    const postPictureContent = (post) => {
        let category = post.post_hint;
        switch (category) {
            case 'image':
                return <ModalImage small={post.url} large={post.url} className={styles.postImage} alt={post.title}/>
            case 'hosted:video':
                return (<video controls>
                    <source src={post.media.reddit_video.scrubber_media_url}/>
                </video>);
            case 'link':
                return (
                    <div className={styles.thumbnail}>
                    <img src={post.thumbnail} alt="post thumbnail" />
                    <a href={post.url}>Link to Post</a>
                    </div>
                );
            case undefined:
                if (post.thumbnail.includes('http')) {
                    return <ModalImage small={post.thumbnail} large={post.thumbnail} alt="post thumbnail" />
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

    const handleShowMore = () => {
        let currentComments = props.post.visibleComments;
        currentComments += 4;
        dispatch(changeNumberOfComments({ index: props.index, currentComments }));
    };

    const handleShowLess = () => {
        let currentComments = props.post.visibleComments;
        currentComments -= 4;
        dispatch(changeNumberOfComments({ index: props.index, currentComments }));
    };

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

        const comments = props.post.comments.slice(0,props.post.visibleComments).filter((comment) => !comment.body.includes('![gif]'));

        if (props.post.showingComments) {
            return (
                <div>
                    {comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} avatar={avatar()}/>
                    ))}
                </div>
            );
        }
    }

    return (
    <div className={styles.postContainer}>
        <div className={styles.postInfoContainer}>
            <img className={styles.icon} src={avatar()} alt="avatar for post"/>
            <div className={styles.postInfo}>
                <p className={styles.author}>by {props.post.author}</p>
                {reddit.selectedSubreddit === 'r/popular' ? <p className={styles.subredditLink} onClick={changeSubreddit}>r/{props.post.subreddit}</p> : <></>}
                <p className={styles.timeSince}>Uploaded {timeSince(Date.now() - props.post.created_utc * 1000)} ago</p>
            </div>
        </div>
        <div className={styles.postContent}>
            <div className={styles.textContent}>
                <div className={styles.titleContent}>
                    <a className={styles.postTitle} href={props.post.url}>{props.post.title}</a>
                    {postTextContent(props.post)}
                </div>
                <div className={styles.social}>
                    <div className={styles.scoreComments}>
                        <p className={styles.score}>Score: {props.post.score}</p>
                        <div className={styles.commentIcon} onClick={() => props.onToggleComments(props.post.permalink)}>
                            <img src={commentImage} alt="comment icon"/>
                            <p>{props.post.num_comments} comments</p>
                        </div>
                    </div>
                    <div className={styles.share}>
                        <p onClick={() => document.getElementById("shareLinks").classList.toggle(`${styles.hide}`)}>Share</p>
                        <ul className={styles.hide} id="shareLinks">
                            <li><a href={shareLinks.facebook} target="_blank" rel="nofollow noreferrer">Share on Facebook</a></li>
                            <li><a href={shareLinks.twitter} target="_blank" rel="nofollow noreferrer">Share on Twitter</a></li>
                            <li><a href={shareLinks.whatsapp} target="_blank" rel="nofollow noreferrer">Share on Whatsapp</a></li>
                            <li className={styles.link} onClick={handleCopy}>Copy Link</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.pictureContent}>
                {postPictureContent(props.post)}
            </div>
        </div>
        <div className={styles.comments}>
        {renderComments()}
            {props.post.showingComments ? <button onClick={() => props.onToggleComments(props.post.permalink)}>Hide comments</button> : <></>}
            {props.post.showingComments && props.post.visibleComments < props.post.comments.length ? <button className={styles.showMoreBtn} onClick={handleShowMore}>Show more</button> : <></>}
            {props.post.showingComments && props.post.visibleComments > 4 ? <button className={styles.showLessBtn} onClick={handleShowLess}>Show less</button> : <></>}
        </div>
    </div>
    )
}