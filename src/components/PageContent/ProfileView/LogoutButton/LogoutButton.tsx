import { useDispatch } from 'react-redux'
import useUserToken from '../../../../hooks/useUserToken'
import { AppDispatch } from '../../../../redux/store'
import {
	setIsAuthenticated,
	setUserData,
} from '../../../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const LogoutButton: React.FC = () => {
	const { removeToken } = useUserToken()
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()

	const logout = () => {
		removeToken()
		dispatch(setIsAuthenticated(false))
		dispatch(setUserData(null))
		localStorage.removeItem('userInfo')
		navigate('/')
	}
	return (
		<div
			className='mb-14 py-2.5 px-5 rounded-2xl bg-red-status-bg text-red-status hover:text-red-status-bg hover:bg-red-status duration-500 font-poppins font-medium mx-auto self-end cursor-pointer'
			onClick={logout}
		>
			Logout
		</div>
	)
}

export default LogoutButton
