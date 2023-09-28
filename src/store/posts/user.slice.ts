import { createSlice } from '@reduxjs/toolkit'

const initialState: string | null = ''

export const userSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addUser: (_, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload))
			return action.payload
		},
	},
})

export const { addUser } = userSlice.actions

export default userSlice.reducer
