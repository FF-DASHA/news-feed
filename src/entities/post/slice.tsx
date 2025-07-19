import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Reactions {
  likes: number;
  dislikes: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  total: number; 
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  total: 0, 
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ skip, limit }: { skip: number; limit: number }) => {
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('ошибка при получении данных');
  }
  const data = await response.json();
  return { posts: data.posts, total: data.total }; 
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
        state.posts = [...state.posts, ...action.payload.posts]; 
        state.total = action.payload.total; 
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ошибка при получении данных';
      });
  },
});

export default postsSlice.reducer;
