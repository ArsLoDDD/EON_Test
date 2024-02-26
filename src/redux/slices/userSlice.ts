import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
//types
import { IUser } from '../../types/userTypes'
//api
import { fetchUserInfo } from '../../api/fetchUser'
import { ProfileViewInfoProps } from '../../components/PageContent/ProfileView/ProfileViewInfo/ProfileViewInfo'
import { EditModalFormProps } from '../../components/Forms/EditModalForm/EditModalForm'

export type UserInfo = {
	userName: string
	avatar: string | null
	role: string
}

interface UserState {
	userData: IUser | null
	requestStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected'
	error: string | null
	isAuthenticated: boolean | null
	isEditModalOpen: boolean
}

const initialState: UserState = {
	userData: null,
	requestStatus: 'idle',
	error: null,
	isAuthenticated: null,
	isEditModalOpen: false,
}

export const fetchUser = createAsyncThunk<IUser, { id: number; token: string }>(
	'user/fetchUser',
	async ({ id, token }) => {
		//fetch user data | server work simulation
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
				if (!localStorage.getItem('userKeywords')) {
					localStorage.setItem('userKeywords', JSON.stringify(data.keywords))
				}
			} else {
				if (localStorage.getItem('userKeywords')) {
					data.keywords = JSON.parse(
						localStorage.getItem('userKeywords') || '[]'
					)
				}
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
		addKeyword: (state, action: PayloadAction<string>) => {
			if (state.userData && 'keywords' in state.userData) {
				state.userData.keywords.push(action.payload)
			}
		},
		removeKeyWord: (state, action: PayloadAction<string>) => {
			if (state.userData && 'keywords' in state.userData) {
				state.userData.keywords = state.userData.keywords.filter(
					keyword => keyword !== action.payload
				)
			}
		},
		closeEditModal: state => {
			state.isEditModalOpen = false
		},
		openEditModal: state => {
			state.isEditModalOpen = true
		},
		setNewUserInfo: (state, action: PayloadAction<EditModalFormProps>) => {
			if (state.userData) {
				state.userData.loginData.username = action.payload.loginData.username
				state.userData.fullName = action.payload.fullName
				// const userInfo = localStorage.getItem('userInfo')
				// if (userInfo) {
				// 	const parsedUserInfo = JSON.parse(userInfo)
				// 	parsedUserInfo.userName = action.payload.loginData.username
				// 	localStorage.setItem('userInfo', JSON.stringify(parsedUserInfo))
				// }
			}
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

export const {
	setIsAuthenticated,
	setUserData,
	addKeyword,
	removeKeyWord,
	closeEditModal,
	openEditModal,
	setNewUserInfo,
} = userSlice.actions

export default userSlice.reducer
