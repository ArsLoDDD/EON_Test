import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Dashboard from './components/Dashboard/Dashboard'
import { fetchUser, setIsAuthenticated } from './redux/slices/userSlice'
import { AppDispatch } from './redux/store'
import useUserToken from './hooks/useUserToken'
import MobileMenu from './components/Dashboard/LeftSide/Menu/MobileMenu'
import useScreenSize, { ScreenSizeEnum } from './hooks/useScreenSize'
import LogoIcon from './components/Icons/LogoIcon'
import useIsAuthenticated from './hooks/useIsAuth'
import AppRoutes from './AppRoutes'

const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const { token } = useUserToken()
	const screenSize = useScreenSize()
	const isAuth = useIsAuthenticated()

	useEffect(() => {
		if (token) {
			dispatch(setIsAuthenticated(true))
		} else {
			dispatch(setIsAuthenticated(false))
		}
	}, [token])

	useEffect(() => {
		if (token) {
			dispatch(fetchUser({ id: 1, token }))
		}
	}, [dispatch, token])

	if (isAuth === null) return <h1>Loading</h1>

	return (
		<>
			{isAuth && (
				<>
					{screenSize !== ScreenSizeEnum.Desktop && (
						<LogoIcon isMobile={true} />
					)}
					{screenSize !== ScreenSizeEnum.Desktop && <MobileMenu />}
					<Dashboard />
				</>
			)}
			{!isAuth && <AppRoutes />}
		</>
	)
}

export default App
