import React from 'react'
import LogoIcon from '../Icons/LogoIcon'

const SkeletonHomePage: React.FC = () => {
	return (
		<div className='w-full h-full py-3 relative flex flex-col justify-center items-center bg-slate-200'>
			<div className='w-full h-1/12 border-4 border-white flex justify-center items-center'>
				<p className=' text-slate-500 font-poppins font-bold text-3xl'>
					Many updates later
				</p>
			</div>
			<div className='w-full h-5/12 flex flex-col md:flex-row border-4 border-white'>
				<div className='w-full md:w-1/2 h-3/6 md:h-full border-4 border-white flex flex-col justify-center items-center py-4'>
					<p className='text-xs font-bold'>Your Accounts follower Stats</p>
					<div className='h-full flex justify-center items-center'></div>
				</div>
				<div className='w-full md:w-1/2 h-3/6 md:h-full border-4 border-white flex flex-col justify-center items-center py-4'>
					<p className='text-xs font-bold'>Yours and Service Keywords</p>
					<div className='h-full flex justify-center items-center'></div>
				</div>
			</div>
			<div className='w-full h-6/12 border-4 border-white flex flex-col justify-center items-center'>
				<p className='text-xs font-bold pt-2 whitespace-nowrap'>
					Chart of growth of number of followers of likes and comments
				</p>
				<div className='w-full h-full flex justify-center items-center'></div>
			</div>
		</div>
	)
}

export default SkeletonHomePage
