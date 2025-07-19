import { configureStore } from '@reduxjs/toolkit'
import { postsSlice } from './entities/post/slice'

const store = configureStore({
 posts: postsSlice,
})

export default store