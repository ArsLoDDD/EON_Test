//connectedSources item in user obj
export interface UserConnectedSource {
	id: number
}

export interface SocialMedia {
	twitter?: string
	instagram?: string
	youtube?: string
}

export interface Contacts {
	email?: string
	phone?: string
	address?: string
}

export interface Rating {
	overall: number
	design: number
	usability: number
	content: number
	[key: string]: number
}

export interface Review {
	user: string
	comment: string
}

export interface ConnectedUser {
	id: number
	username: string
	avatar: string | null
	connectedAccountData: {
		username: string
		password: string
	}
}

export interface Source {
	id: number
	name: string
	type: string
	description: string
	website: string
	bgImage: string
	logo: string
	socialMedia: SocialMedia
	contacts: Contacts
	categories: string[]
	tags: string[]
	language: string
	country: string
	established: string
	about: string
	ratings: Rating
	reviews: Review[]
	connectedUsers: ConnectedUser[]
}

export interface SourceDataPosts {
	id: number
	author: string
	text: string
	likes: number
	comments: number
}
