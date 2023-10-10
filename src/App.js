import React from "react";
import styles from "./App.module.css";
import Posts from "./features/Posts/Posts";
import { useEffect } from "react";
import Header from "./features/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchSubredditData, fetchComments } from "./app/redditSlice";
import SubredditInfo from "./features/SubredditInfo/SubredditInfo";


function App() {
  const reddit = useSelector((state) => state.reddit);
  const { selectedSubreddit, posts, subredditData } = reddit;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit, dispatch]);

  useEffect(() => {
    dispatch(fetchSubredditData(selectedSubreddit))
  }, [selectedSubreddit, dispatch])

  const subredditInfo = () => {
    if(subredditData !== undefined) {
      return (
      <div className={styles.subredditInfo}>
        <img src={subredditData.icon_img} />
        <h2>{subredditData.display_name_prefixed}</h2>
      </div>
      )}
  }

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  return (
      <>
      <Header />
      <div className={styles.content}>
        <div className={styles.homeContainer}>
          {subredditInfo()}
            <div className={styles.post}>
                {posts.map((post, index) => (
                <Posts 
                    post={post}
                    key={post.id}
                    onToggleComments={onToggleComments(index)}
                    />
                ))}
            </div>
        </div>
        <aside>
          <SubredditInfo />
        </aside>
      </div>
      </>
  )
}

export default App;
