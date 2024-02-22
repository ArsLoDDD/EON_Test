import React from 'react'
import LogoIcon from '../Icons/LogoIcon'
import { Link } from 'react-router-dom'

const Logo: React.FC = () => {
	return (
		<div className='flex justify-center mx-auto mb-12 items-center gap-2 group -translate-x-3'>
			<Link to={'/'} className='group-hover:rotate-180 duration-500'>
				<LogoIcon
					className={
						'group-hover:fill-purple-bg-item-menu  fill-black duration-500'
					}
				/>
			</Link>
			<Link
				to='/'
				className='flex justify-center items-end gap-0.5 group-hover:text-purple-bg-item-menu duration-500 relative'
			>
				<p className='font-poppins text-xl font-semibold'>Dashboard</p>
				<p className=' text-gray-title text-xs leading-6 group-hover:scale-110 duration-500 absolute -right-7 -top-2 rotate-45'>
					Service
				</p>
			</Link>
		</div>
	)
}

export default Logo
