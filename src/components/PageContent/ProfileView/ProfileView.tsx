import React from 'react'
import ProfileViewBg from './ProfileViewBg/ProfileViewBg'
import ProfileViewInfo from './ProfileViewInfo/ProfileViewInfo'
import useScreenSize, { ScreenSizeEnum } from '../../../hooks/useScreenSize'
import LogoutButton from './LogoutButton/LogoutButton'

const ProfileView: React.FC = () => {
	const screenSize = useScreenSize()
	return (
		<div className='flex flex-col w-full h-screen'>
			{screenSize !== ScreenSizeEnum.Mobile && (
				<div className='bg-slate-100 w-full md:w-11/12 md:h-2/5 mx-auto rounded-3xl md:mt-5 '>
					<ProfileViewBg />
					<ProfileViewInfo />
				</div>
			)}
			<div className=' w-full md:w-10/12 h-full md:h-4/6 mx-auto bg-slate-100 rounded-b-3xl flex relative'>
				<div className='w-full h-full flex flex-col md:flex-row justify-between items-center'>
					{screenSize === ScreenSizeEnum.Mobile && <ProfileViewInfo />}
					<LogoutButton />
				</div>
			</div>
		</div>
	)
}

export default ProfileView
