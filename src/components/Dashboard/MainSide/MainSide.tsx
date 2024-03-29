import React from 'react'
//redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
//router
import AppRoutes from '../../../AppRoutes'
//location
import { useLocation } from 'react-router-dom'

const MainSide: React.FC = () => {
	//redux
	const userInfo = useSelector((state: RootState) => state.user?.userData)
	//location
	const path = useLocation().pathname

	const typedUserInfo = userInfo as { fullName: string }
	return (
		<div className='w-full h-screen bg-slate-200 flex justify-center'>
			<div className='flex flex-col justify-center  w-full md:w-11/12'>
				{userInfo && path === ('/' || '/home') && (
					<p className='font-poppins h-9 text-3xl font-semibold mt-4 mb-2 select-none self-end lg:self-start mr-5 md:mr-0'>
						Hello {typedUserInfo.fullName} 👋🏼,
					</p>
				)}
				{!userInfo && path === ('/' || '/home') && (
					<div className='mt-4 mb-2 h-9.55 w-2/12 rounded-3xl bg-gray-300 animate-pulse'></div>
				)}

				<div className=' bg-white md:rounded-3xl flex justify-center h-11/12'>
					<AppRoutes />
				</div>
			</div>
		</div>
	)
}

export default MainSide
