import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import useIsAuthenticated from './hooks/useIsAuth'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const AppRoutes: React.FC = (): JSX.Element => {
	const isAuth = useIsAuthenticated()
	return (
		<Routes>
			{isAuth && (
				<>
					<Route path='/' element={<HomePage />} />
					<Route path='/profile' element={<ProfilePage />} />
				</>
			)}
			{!isAuth && (
				<>
					<Route path='/' element={<LoginPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='*' element={<h1>error</h1>} />
				</>
			)}
		</Routes>
	)
}

export default AppRoutes
