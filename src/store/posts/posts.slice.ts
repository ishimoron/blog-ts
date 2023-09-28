import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPosts } from '../../types/types'

const initialState: IPosts[] = []

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: (state, action) => {
			state.push(action.payload)
		},
		deletePost: (state, action) => {
			return state.filter(post => post.id !== action.payload)
		},
		changePost: (state, action: PayloadAction<IPosts>) => {
			const { title, text, id } = action.payload
			const toChange = state.find(post => post.id === id)
			if (toChange) {
				toChange.title = title
				toChange.text = text
			}
		},
	},
})

export const { addPost, deletePost, changePost } = postsSlice.actions

export default postsSlice.reducer
