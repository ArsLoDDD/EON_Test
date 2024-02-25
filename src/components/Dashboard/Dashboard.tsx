import React, { useState } from 'react'
//hooks
import useScreenSize, { ScreenSizeEnum } from '../../hooks/useScreenSize'
//components
import MainSide from './MainSide/MainSide'
import LeftSide from './LeftSide/LeftSide'

const Dashboard: React.FC = () => {
	//hooks
	const screenSize = useScreenSize()
	return (
		<div className='flex bg-red-800 w-full h-screen'>
			{screenSize === ScreenSizeEnum.Desktop && <LeftSide />}
			<MainSide />
		</div>
	)
}

export default Dashboard
