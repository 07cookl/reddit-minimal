import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";
import { fetchComments, fetchPosts, fetchSubredditData } from "./app/redditSlice";
import Footer from "./features/Footer/Footer";
import Header from "./features/Header/Header";
import Posts from "./features/Posts/Posts";
import SubredditInfo from "./features/SubredditInfo/SubredditInfo";


function App() {
  const reddit = useSelector((state) => state.reddit);
  const { selectedSubreddit, posts, subredditData, isLoading, error } = reddit;
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
        <img src={subredditData.icon_img} alt="subreddit icon"/>
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

if (isLoading) {
  return (
    <p>Loading content...</p>
  )
}

if (error) {
  return (
    <p>Unable to load content.</p>
  )
}

  return (
      <>
      <Header />
      <div className={styles.content}>
        {subredditInfo()}
        <main>
          <aside>
            <SubredditInfo />
          </aside>
          <div className={styles.post}>
              {posts.map((post, index) => (
              <Posts 
                  post={post}
                  key={post.id}
                  onToggleComments={onToggleComments(index)}
                  index={index}
                  />
              ))}
          </div>
        </main>
      </div>
      <Footer />
      </>
  )
}

export default App;
