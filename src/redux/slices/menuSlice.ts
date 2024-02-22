import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MenuState {
	activeElement: number
	mobileMenuIsActive: boolean
}

const initialState: MenuState = {
	activeElement: 0,
	mobileMenuIsActive: false,
}

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setActiveElement: (state, action: PayloadAction<number>) => {
			state.activeElement = action.payload
		},
		setMobileMenuIsActive: (state, action: PayloadAction<boolean>) => {
			state.mobileMenuIsActive = action.payload
		},
	},
})

export const { setActiveElement, setMobileMenuIsActive } = menuSlice.actions
export default menuSlice.reducer
