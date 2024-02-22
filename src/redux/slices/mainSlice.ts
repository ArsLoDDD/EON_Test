import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MainState {
	data: any[]

}

const initialState: MainState = {
	data: [],
}

const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<any[]>) => {
			state.data = action.payload
		}
	},
})

export const { setData } = mainSlice.actions
export default mainSlice.reducer
