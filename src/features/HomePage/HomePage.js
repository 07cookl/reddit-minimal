import React from "react";
import styles from "./HomePage.module.css";
import Posts from "../Posts/Posts";
import { getPopularPost } from "../../api/reddit";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPopularPost().then(setPosts);
    }, []);

    console.log(posts);

    return (
    <div className={styles.homeContainer}>
        <p>This will be the home page.</p>
        <div className={styles.post}>
            {posts.map((post) => (
            <Posts 
                post={post}
                id={posts.id}/>
            ))}
        </div>
    </div>
    )
}