import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from './components/Dashboard/Dashboard'
import { fetchUser } from './redux/slices/userSlice'
import { AppDispatch, RootState } from './redux/store'
import useUserToken from './hooks/useUserToken'
import MobileMenu from './components/Dashboard/LeftSide/Menu/MobileMenu'
import useScreenSize, { ScreenSizeEnum } from './hooks/useScreenSize'
import LogoIcon from './components/Icons/LogoIcon'
import useIsAuthenticated from './hooks/useIsAuth'
import AppRoutes from './AppRoutes'
import { setIsAuthenticated } from './redux/slices/authSlice'
import { setMobileMenuIsActive } from './redux/slices/menuSlice'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'

const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const screenSize = useScreenSize()
	const isAuth = useIsAuthenticated()
	const ref = useRef<HTMLDivElement>(null)
	const toggleButtonRef = useRef<HTMLDivElement>(null)
	const mobileMenuIsActive = useSelector(
		(state: RootState) => state.menu.mobileMenuIsActive
	)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(setIsAuthenticated(true))
			dispatch(fetchUser({ id: 1, token }))
		}
	}, [dispatch, isAuth])

	useEffect(() => {
		const handleClickOutsideMenu = (e: MouseEvent) => {
			if (
				mobileMenuIsActive &&
				ref.current &&
				!ref.current.contains(e.target as Node) &&
				e.target !== toggleButtonRef.current &&
				!toggleButtonRef.current?.contains(e.target as Node)
			) {
				dispatch(setMobileMenuIsActive(false))
			}
		}

		document.addEventListener('click', handleClickOutsideMenu)

		return () => {
			document.removeEventListener('click', handleClickOutsideMenu)
		}
	}, [mobileMenuIsActive])

	if (isAuth === null)
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<LoadingScreen />
			</div>
		)

	return (
		<>
			{isAuth && (
				<>
					{screenSize !== ScreenSizeEnum.Desktop && (
						<div ref={toggleButtonRef}>
							<LogoIcon isMobile={true} />
						</div>
					)}
					{screenSize !== ScreenSizeEnum.Desktop && (
						<div
							className={`w-full md:w-1/2 ${
								mobileMenuIsActive ? 'z-30' : 'z-1'
							} lg:hidden h-screen absolute`}
							ref={ref}
						>
							<MobileMenu />
						</div>
					)}
					<Dashboard />
				</>
			)}
			{!isAuth && <AppRoutes />}
		</>
	)
}

export default App
