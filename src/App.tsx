//react
import React, { useEffect, useRef } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux/slices/userSlice'
import { AppDispatch, RootState } from './redux/store'
import { setIsAuthenticated } from './redux/slices/authSlice'
import { setMobileMenuIsActive } from './redux/slices/menuSlice'
//router
import AppRoutes from './AppRoutes'
//hooks
import useScreenSize, { ScreenSizeEnum } from './hooks/useScreenSize'
import useIsAuthenticated from './hooks/useIsAuth'
//components
import MobileMenu from './components/Dashboard/LeftSide/Menu/MobileMenu'
import LogoIcon from './components/Icons/LogoIcon'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Dashboard from './components/Dashboard/Dashboard'
import EditModal from './components/EditModal/EditModal'

const App: React.FC = () => {
	//redux
	const dispatch: AppDispatch = useDispatch()
	const mobileMenuIsActive = useSelector(
		(state: RootState) => state.menu.mobileMenuIsActive
	)
	const isEditModalOpen = useSelector(
		(state: RootState) => state.user.isEditModalOpen
	)
	//refs
	const ref = useRef<HTMLDivElement>(null)
	const toggleButtonRef = useRef<HTMLDivElement>(null)
	//hooks
	const screenSize = useScreenSize()
	const isAuth = useIsAuthenticated()

	useEffect(() => {
		//check if the user is authenticated
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(setIsAuthenticated(true))
			dispatch(fetchUser({ id: 1, token }))
		}
	}, [dispatch, isAuth])

	useEffect(() => {
		//handle click outside menu to close it
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
		//show loading screen while checking if the user is authenticated
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<LoadingScreen />
			</div>
		)

	return (
		<>
			{isAuth && (
				<>
					<EditModal isOpen={isEditModalOpen} />

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
