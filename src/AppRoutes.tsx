import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import useIsAuthenticated from './hooks/useIsAuth'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import KeywordsPage from './pages/KeywordsPage'
import SourcesPage from './pages/SourcesPage'
import SourcePage from './pages/SourcePage'

const AppRoutes: React.FC = (): JSX.Element => {
	const isAuth = useIsAuthenticated()
	return (
		<Routes>
			{isAuth && ( //if the user is authenticated
				<>
					<Route path='/' element={<HomePage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/keywords' element={<KeywordsPage />} />
					<Route path='/sources' element={<SourcesPage />} />
					<Route path='/source/:sourcename' element={<SourcePage />} />
					<Route path='*' element={<h1>error</h1>} />
				</>
			)}
			{!isAuth && ( //if the user is not authenticated
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
