import React from "react";
import styles from "./SearchResults.module.css";
import Posts from "../Posts/Posts";

export function SearchResults(props) {
    return (
        <div>
            <p>This will be the search results.</p>
            <div className={styles.post}>
                {props.searchResults.map((post) => (
                <Posts 
                    post={post}
                    key={post.id}/>
                ))}
            </div>
        </div>
    )
}