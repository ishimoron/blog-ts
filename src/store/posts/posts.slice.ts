import { createSlice } from '@reduxjs/toolkit'
import { IPosts } from '../../types/types'

const initialState: IPosts[] = []

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: (state, action) => {
			state.push(action.payload)
		},
	},
})

export const { addPost } = postsSlice.actions

export default postsSlice.reducer
