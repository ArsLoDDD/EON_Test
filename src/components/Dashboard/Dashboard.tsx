import React, { useState } from 'react'
import MainSide from './MainSide/MainSide'
import LeftSide from './LeftSide/LeftSide'
import useScreenSize, { ScreenSizeEnum } from '../../hooks/useScreenSize'
import { ScreenSize } from '../../hooks/useScreenSize'

const Dashboard: React.FC = () => {
	const screenSize = useScreenSize()
	return (
		<div className='flex bg-red-800 w-full h-screen'>
			{screenSize === ScreenSizeEnum.Desktop && <LeftSide />}
			<MainSide />
		</div>
	)
}

export default Dashboard
