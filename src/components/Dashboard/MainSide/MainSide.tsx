import React from 'react'
import AppRoutes from '../../../AppRoutes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useLocation } from 'react-router-dom'

const MainSide: React.FC = () => {
	const userInfo = useSelector((state: RootState) => state.user?.userData)
	const path = useLocation().pathname

	const typedUserInfo = userInfo as { fullName: string }
	return (
		<div className='w-full bg-slate-200 flex justify-center '>
			<div className='flex flex-col  w-full md:w-11/12'>
				{userInfo && path === ('/' || '/home') && (
					<p className='font-poppins text-3xl font-semibold my-12 select-none self-end lg:self-start mr-5 md:mr-0'>
						Hello {typedUserInfo.fullName} 👋🏼,
					</p>
				)}
				<div className=' bg-white md:rounded-3xl flex justify-center h-screen mb-12'>
					<AppRoutes />
				</div>
			</div>
		</div>
	)
}

export default MainSide
