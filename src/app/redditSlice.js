import { createSlice, createSelector } from '@reduxjs/toolkit';
import { postComments, searchForPosts, searchPreview, subredditInfo } from '../api/reddit';

const initialState = {
    posts: [],
    previews: [],
    subredditData: {},
    error: false,
    isLoading: false,
    errorPreview: false,
    isLoadingPreview: false,
    errorSubredditData: false,
    isLoadingSubredditData: false,
    searchTerm: '',
    selectedSubreddit: 'r/popular'
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        setPreviews(state, action) {
            state.previews = action.payload;
        },
        startGetPreviews(state) {
            state.isLoadingPreview = true;
            state.errorPreview = false;
        },
        getPreviewsSuccess(state, action) {
            state.isLoadingPreview = false;
            state.previews = action.payload;
        },
        getPreviewsFailed(state) {
            state.isLoadingPreview = false;
            state.errorPreview = true;
        },
        setSubredditData(state, action) {
            state.subredditData = action.payload;
        },
        startGetSubredditData(state) {
            state.isLoadingSubredditData = true;
            state.errorSubredditData = false;
        },
        getSubredditDataSuccess(state, action) {
            state.isLoadingSubredditData = false;
            state.subredditData = action.payload;
        },
        getSubredditDataFailed(state) {
            state.isLoadingSubredditData = false;
            state.errorSubredditData = true;
        },
        toggleShowingComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        },
        startGetComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload]
            .showingComments;
            if (!state.posts[action.payload].showingComments) {
            return;
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].errorComments = false;
        },
        getCommentsSuccess(state, action) {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].comments = action.payload;
        },
        getCommentsFailed(state, action) {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].errorComments = true;
        }
    }
});

export const {
    setPosts,
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSearchTerm,
    setSelectedSubreddit,
    setPreviews,
    startGetPreviews,
    getPreviewsSuccess,
    getPreviewsFailed,
    setSubredditData,
    startGetSubredditData,
    getSubredditDataSuccess,
    getSubredditDataFailed,
    toggleShowingComments,
    startGetComments,
    getCommentsSuccess,
    getCommentsFailed
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetPosts());
        const posts = await searchForPosts(subreddit);

        const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }));

        dispatch(getPostsSuccess(postsWithMetadata));
    } catch (error) {
        dispatch(getPostsFailed());
    }
};

export const fetchPreviews = (term) => async (dispatch) => {
    try {
        dispatch(startGetPreviews());
        const previews = await searchPreview(term);

        dispatch(getPreviewsSuccess(previews));
    } catch (error) {
        dispatch(getPreviewsFailed);
    }
};

export const fetchSubredditData = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetSubredditData());
        const subredditData = await subredditInfo(subreddit);

        dispatch(getSubredditDataSuccess(subredditData));
    } catch (error) {
        dispatch(getSubredditDataFailed);
    }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
    try {
        dispatch(startGetComments(index));
        const commentData = await postComments(permalink);

        dispatch(getCommentsSuccess({index, commentData}));
    } catch (error) {
        dispatch(getCommentsFailed(index));
    };
};

export const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
