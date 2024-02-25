// User types
export interface IUser {
	id: number
	role: UserRoles
	loginData: {
		username: string
		password: string
	}
	email: string
	fullName: string
	avatar: string | null
	socialMedia: UserSocialMedia
	contacts: {
		phone: string
		address: string
	}
	keywords: string[]
	connectedSources: UsersConnectedSources[]
}
//UserConnectedSources
export interface UsersConnectedSources {
	id: number
	name: string
	type: string
	bgImage: string
	description: string
	logo: string | null
	categories: string[]
	connectedAccountData: UserConnectedSourceAccountData
}
//User connected source account data
export interface UserConnectedSourceAccountData {
	username: string
	followers: number
	following: number
	likes: number
	posts: number
	status: UserSourceStatus
}
//User login data
export interface UserLoginData {
	username: string
	password: string
}
//User register data
export interface UserRegisterData {
	username: string
	password: string
	email: string
	fullName: string
}
//User update data
export interface UserUpdateData {
	email: string
	fullName: string
	avatar: string | null
	socialMedia: UserSocialMedia
	contacts: {
		phone: string
		address: string
	}
	tagWords: string[]
}
//User connected sources
export interface UserConnectedSources {
	id: number
}
//User token
export type UserToken = string | null
//User useAuth
export interface UserUseIsAuth {
	token: UserToken
	isAuth: boolean
}
//User social media
export interface UserSocialMedia {
	facebook: string | null
	linkedin: string | null
	telegram: string | null
}

//User roles
export enum UserRoles {
	Admin = 'Admin',
	ServiceCustomer = 'Service Customer',
	VipServiceCustomer = 'Vip Service Customer',
}
//User Source status enum
export enum UserSourceStatus {
	Active = 'Active',
	Disabled = 'Disabled',
}
