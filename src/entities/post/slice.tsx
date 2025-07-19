import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Emotions = Record<string, number>;

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  emotions: Emotions; 
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://dummyjson.com/posts?limit=10&skip=0');
  if (!response.ok) {
    throw new Error('ошибка при получении данных');
  }
  const data = await response.json();
  return data.posts; 
});


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; 
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ошибка при получении данных';
      });
  },
});

export default postsSlice.reducer;
