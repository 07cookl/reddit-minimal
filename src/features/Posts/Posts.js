import React from "react";
import Markdown from "react-markdown";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import "../../../node_modules/video-react/dist/video-react.css";
import { changeNumberOfComments, setSelectedSubreddit } from "../../app/redditSlice";
import arrowUp from "../../resources/arrow-down.svg";
import arrowDown from "../../resources/arrow-up.svg";
import closeIcon from "../../resources/close.svg";
import commentImage from "../../resources/comment.svg";
import copyIcon from "../../resources/copy.svg";
import facebookIcon from "../../resources/facebook.svg";
import shareIcon from "../../resources/share.svg";
import twitterIcon from "../../resources/twitter.svg";
import whatsappIcon from "../../resources/whatsapp.svg";
import randomAvatar from "../../util/randomAvatar";
import timeSince from "../../util/timeSince";
import unEscape from "../../util/unEscape";
import Comment from "../Comments/Comments";
import styles from "./Posts.module.css";
import PostLoader from "../../Loaders/PostLoader";

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
                return (
                    <div className={styles.postImageContainer}>
                        <ModalImage small={post.url} medium={post.url} className={styles.postImage} alt={post.title}/>
                    </div>
                )
            case 'hosted:video':
                return (
                    <div>
                        <video className={styles.contentVideo} controls >
                            <source src={post.media.reddit_video.scrubber_media_url}></source>
                        </video>
                    </div>
                );
            case 'link':
                return (
                    <div className={styles.thumbnail}>
                    <img src={post.thumbnail} alt="post thumbnail" />
                    <a href={post.url}>{post.url}</a>
                    </div>
                );
            case undefined:
                if (post.thumbnail.includes('http')) {
                    return <ModalImage small={post.thumbnail} medium={post.thumbnail} alt="post thumbnail" />
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
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
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

    const socialsId = `shareLinks${props.index}`;

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
                    <a className={styles.postTitle} href={props.post.url}>{unEscape(props.post.title)}</a>
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
                        <img src={shareIcon} onClick={() => document.getElementById(socialsId).classList.toggle(`${styles.hide}`)} />
                        <div className={styles.hide} id={socialsId}>
                            <a href={shareLinks.facebook} target="_blank" rel="nofollow noreferrer"><img src={facebookIcon}/></a>
                            <a href={shareLinks.twitter} target="_blank" rel="nofollow noreferrer"><img src={twitterIcon}/></a>
                            <a href={shareLinks.whatsapp} target="_blank" rel="nofollow noreferrer"><img src={whatsappIcon}/></a>
                            <img src={copyIcon} onClick={handleCopy}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.pictureContent}>
                {postPictureContent(props.post)}
            </div>
        </div>
        <div className={styles.comments}>
        {renderComments()}
            <div className={styles.commentsButtons}>
                <div>
                    {props.post.showingComments && props.post.visibleComments < props.post.comments.length ? <img className={styles.showMoreBtn} src={arrowUp} onClick={handleShowMore}/> : <></>}
                    {props.post.showingComments && props.post.visibleComments > 4 ? <img className={styles.showLessBtn} src={arrowDown} onClick={handleShowLess}/> : <></>}
                </div>
                {props.post.showingComments && props.post.visibleComments < props.post.comments.length ? <img className={styles.hideBtn} src={closeIcon} onClick={() => props.onToggleComments(props.post.permalink)}/> : <></>}
            </div>
        </div>
    </div>
    )
}