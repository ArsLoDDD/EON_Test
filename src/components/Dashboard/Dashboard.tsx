import React from 'react'
//hooks
import useScreenSize, { ScreenSizeEnum } from '../../hooks/useScreenSize'
//components
import MainSide from './MainSide/MainSide'
import LeftSide from './LeftSide/LeftSide'

const Dashboard: React.FC = () => {
	//hooks
	const screenSize = useScreenSize()
	return (
		<div className='flex bg-slate-200 items-center w-full h-screen'>
			{screenSize === ScreenSizeEnum.Desktop && <LeftSide />}
			<MainSide />
		</div>
	)
}

export default Dashboard
