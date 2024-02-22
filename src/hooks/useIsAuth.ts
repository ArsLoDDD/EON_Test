import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useIsAuthenticated = (): boolean | null => {
	const isAuthenticated: boolean | null = useSelector(
		(state: RootState) => state.user.isAuthenticated
	)
	return isAuthenticated
}

export default useIsAuthenticated
