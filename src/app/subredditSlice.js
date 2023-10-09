import { createSlice, createSelector } from '@reduxjs/toolkit';
import { searchForPosts, searchPreview } from '../api/reddit';

const initialState = {
    previews: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedSubreddit: '/r/popular/',
    subredditData: {}
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
    }
});