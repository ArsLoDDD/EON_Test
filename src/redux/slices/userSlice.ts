import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserInfo } from '../../api/fetchUser'

import { IUser } from '../../types/userTypes'


type UserInfo = {
	userName: string
	avatar: string | null
	role: string
}

interface UserState {
	userData: IUser | {} | null
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected'
	error: string | null
	isAuthenticated: boolean | null
}

const initialState: UserState = {
	userData: {},
	requestStatus: 'idle',
	error: null,
	isAuthenticated: null,
}

export const fetchUser = createAsyncThunk<IUser, { id: number; token: string }>(
	'user/fetchUser',
	async ({ id, token }) => {
		try {
			const data = await fetchUserInfo(id, token)
			let userInfo: UserInfo
			if (!localStorage.getItem('userInfo')) {
				userInfo = {
					userName: data.loginData.username,
					avatar: data.avatar,
					role: data.role,
				}
				localStorage.setItem('userInfo', JSON.stringify(userInfo))
			} else {
				userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
			}
			return data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload
		},
		setUserData: (state, action: PayloadAction<IUser | null>) => {
			state.userData = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.requestStatus = 'pending'
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.requestStatus = 'fulfilled'
				state.userData = action.payload
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.requestStatus = 'rejected'
				state.error = action.error.message || 'Something went wrong'
			})
	},
})

export const { setIsAuthenticated, setUserData } = userSlice.actions

export default userSlice.reducer
