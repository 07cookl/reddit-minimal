import React from "react";
import styles from "./HomePage.module.css";
import Posts from "../Posts/Posts";
import { useEffect } from "react";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../app/redditSlice";

export default function HomePage(props) {
    const reddit = useSelector((state) => state.reddit);
    const { selectedSubreddit, posts } = reddit;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit, dispatch]);

    return (
        <>
        <Header onSearch={props.onSearch} previews={props.previews} onPreview={props.onPreview}/>
        <div className={styles.homeContainer}>
            <p>This will be the home page.</p>
            <div className={styles.post}>
                {posts.map((post) => (
                <Posts 
                    post={post}
                    key={post.id}/>
                ))}
            </div>
        </div>
        </>
    )
}