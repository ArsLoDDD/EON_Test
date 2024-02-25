// redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: './../../DB/' }),
	endpoints: builder => ({
		getInstagramData: builder.query({
			query: () => 'instagramData.json',
		}),
		getTwitterData: builder.query({
			query: () => 'twitterData.json',
		}),
		getFacebookData: builder.query({
			query: () => 'facebookData.json',
		}),
		getSources: builder.query({
			query: () => 'sources.json',
		}),
	}),
})

export const {} = api
