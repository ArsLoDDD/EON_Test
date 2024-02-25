import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Keyword = string

export interface IKeywordsState {
	keywords: Keyword[] | []
}
const initialState: IKeywordsState = {
	keywords: [],
}

const keywordsSlice = createSlice({
	name: 'keywords',
	initialState,
	reducers: {
		setKeywords: (state, action: PayloadAction<string[]>) => {
			state.keywords = [...action.payload]
		},
		addNewKeyword: (state, action: PayloadAction<string>) => {
			state.keywords = [...state.keywords, action.payload]
		},
	},
})

export const { setKeywords, addNewKeyword } = keywordsSlice.actions
export default keywordsSlice.reducer
