import { useState } from 'react'
import { UserToken } from '../types/userTypes'

interface UserTokenType {
	token: UserToken | null
	saveToken: (userToken: string) => void
	removeToken: () => void
}

const useUserToken = (): UserTokenType => {
	const [token, setToken] = useState<UserToken | null>(
		localStorage.getItem('userToken')
	)

	const saveToken = (userToken: string): void => {
		localStorage.setItem('userToken', userToken)
		setToken(userToken)
	}

	const removeToken = (): void => {
		localStorage.removeItem('userToken')
		setToken(null)
	}

	return { token, saveToken, removeToken }
}

export default useUserToken
