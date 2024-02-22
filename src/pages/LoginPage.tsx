import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../redux/slices/userSlice'
import { AppDispatch } from '../redux/store'
import useUserToken from '../hooks/useUserToken'

const LoginPage: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const { token, saveToken, removeToken } = useUserToken()

	useEffect(() => {
		// dispatch(setIsAuthenticated(true))
		// saveToken('token')
	}, [])
	return (
		<div>
			<h1>Login Page</h1>
		</div>
	)
}
export default LoginPage
