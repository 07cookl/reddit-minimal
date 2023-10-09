import { createSlice, createSelector } from '@reduxjs/toolkit';
import { searchForPosts, searchPreview } from '../api/reddit';

const initialState = {
    posts: [],
    previews: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedSubreddit: '/r/popular/',
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
            state.isLoading = true;
            state.error = false;
        },
        getPreviewsSuccess(state, action) {
            state.isLoading = false;
            state.previews = action.payload;
        },
        getPreviewsFailed(state) {
            state.isLoading = false;
            state.error = true;
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
    getPreviewsFailed
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetPosts());
        const posts = await searchForPosts(subreddit);

        dispatch(getPostsSuccess(posts));
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
}

export const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
