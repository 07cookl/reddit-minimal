import React from "react";
import styles from "./App.css";
import Posts from "./features/Posts/Posts";
import { useEffect } from "react";
import Header from "./features/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./app/redditSlice";


function App() {
  const reddit = useSelector((state) => state.reddit);
  const { selectedSubreddit, posts } = reddit;
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);

  return (
      <>
      <Header />
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

export default App;
