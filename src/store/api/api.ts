import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = '12'
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['User'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: builder => ({}),
})
