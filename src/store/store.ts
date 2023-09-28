import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './posts/posts.slice'
import userReducer from './posts/user.slice'

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		user: userReducer,
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
