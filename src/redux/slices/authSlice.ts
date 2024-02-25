//redux
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
//types
import { IUser, UserLoginData } from '../../types/userTypes'
import { UserInfo } from './userSlice'
//npm
import axios from 'axios'

export interface AuthState {
	isAuthLogin: boolean
	loading: boolean
	error: boolean | null
	errorMessage: string
}

export enum StatusResponse {
	Success = 200,
	NotFound = 404,
}

const initialState: AuthState = {
	isAuthLogin: false,
	loading: false,
	error: null,
	errorMessage: '',
}

export interface UserAuthResponse {
	status: StatusResponse
	message: string
	token: number
	userInfo: UserInfo
}

export interface UserAuthResponseError {
	status: StatusResponse
	message: string
}

export const userAuth = createAsyncThunk(
	'auth/userAuth',
	async (
		obj: UserLoginData
	): Promise<UserAuthResponse | UserAuthResponseError> => {
		try {
			const { data } = await axios.get('./../../DB/users.json')
			const findUser: IUser | undefined = data.find(
				(user: any) => user.loginData.username === obj.username
			)
			if (!!findUser) {
				let userInfo: UserInfo = {
					userName: findUser.loginData.username,
					avatar: findUser.avatar,
					role: findUser.role,
				}
				localStorage.setItem('token', findUser.id.toString())
				localStorage.setItem('userInfo', JSON.stringify(userInfo))
				if (!localStorage.getItem('userKeywords')) {
					localStorage.setItem(
						'userKeywords',
						JSON.stringify(findUser.keywords)
					)
				}
				return {
					status: StatusResponse.Success,
					message: 'User found',
					token: findUser.id,
					userInfo: userInfo,
				}
			}
			throw new Error('User not found')
		} catch (error) {
			console.log(error)
			return {
				status: StatusResponse.NotFound,
				message: 'Wrong username or password',
			}
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthLogin = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		clearError: state => {
			state.error = null
			state.errorMessage = ''
		},
	},
	extraReducers: builder => {
		builder.addCase(userAuth.pending, state => {
			state.loading = true
		})
		builder.addCase(
			userAuth.fulfilled,
			(
				state,
				action: PayloadAction<UserAuthResponse | UserAuthResponseError>
			) => {
				if (action.payload.status === StatusResponse.NotFound) {
					state.error = true
					state.errorMessage = action.payload.message
				}
				if (action.payload.status === StatusResponse.Success) {
					if ('token' in action.payload) {
						localStorage.setItem('token', action.payload.token.toString())
						localStorage.setItem(
							'userInfo',
							JSON.stringify(action.payload.userInfo)
						)
					}
					state.isAuthLogin = true
					state.error = null
					state.errorMessage = ''
				}
				state.loading = false
			}
		)
		builder.addCase(userAuth.rejected, state => {
			state.loading = false
			state.error = true
		})
	},
})

export const { setIsAuthenticated, setLoading, clearError } = authSlice.actions

export default authSlice.reducer
