import { useState } from 'react'
import { UserToken } from '../types/userTypes'

interface UserTokenType {
	token: UserToken | null
	saveToken: (userToken: string) => void
	removeToken: () => void
}

const useUserToken = (): UserTokenType => {
	const [token, setToken] = useState<UserToken | null>(
		localStorage.getItem('token')
	)

	const saveToken = (userToken: string): void => {
		localStorage.setItem('token', userToken)
		setToken(userToken)
	}

	const removeToken = (): void => {
		localStorage.removeItem('token')
		setToken(null)
	}

	return { token, saveToken, removeToken }
}

export default useUserToken
