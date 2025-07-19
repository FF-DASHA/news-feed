import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Post {
 
}

export interface PostsState {
 
}


const initialState: PostsState = {
 
};


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {

});


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

});


export default postsSlice.reducer;