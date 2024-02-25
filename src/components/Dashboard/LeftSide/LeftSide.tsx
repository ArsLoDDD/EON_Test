import React from 'react'
// components
import Logo from '../../Logo/Logo'
import Menu from './Menu/Menu'
import ActiveUser from './ActiveUser/ActiveUser'

const LeftSide: React.FC = () => {
	return (
		<div className='bg-white h-screen w-3/12 flex flex-col justify-between py-12'>
			<div className='flex flex-col justify-center items-center'>
				<Logo />
				<Menu />
			</div>
			<ActiveUser />
		</div>
	)
}

export default LeftSide
