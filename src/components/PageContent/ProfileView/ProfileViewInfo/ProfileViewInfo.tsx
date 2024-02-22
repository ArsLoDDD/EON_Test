import React from 'react'
import Avatar from '../../../Dashboard/LeftSide/ActiveUser/Avatar/Avatar'
import { RootState } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import AvatarWithoutImg from '../../../Dashboard/LeftSide/ActiveUser/Avatar/AvatarWithoutImg/AvatarWithoutImg'
import useScreenSize, { ScreenSizeEnum } from '../../../../hooks/useScreenSize'

const ProfileViewInfo: React.FC = () => {
	const userInfo = useSelector((state: RootState) => state.user.userData)
	const screenSize = useScreenSize()

	const typedUserInfo = userInfo as {
		fullName: string
		loginData: {
			username: string
		}
		role: string
		avatar: string | null
	}
	return (
		<div className='md:h-2/5 pt-8 md:pt-0 rounded-b-3xl relative flex flex-col md:flex-row items-center'>
			{typedUserInfo && (
				<>
					{typedUserInfo.avatar ? (
						<Avatar
							classNameArg='h-28 w-28 md:h-40 md:w-40 xl:w-46 xl-h46 xl2:h-52 xl2:w-52'
							up={screenSize === ScreenSizeEnum.Mobile ? false : true}
							url={typedUserInfo.avatar}
						/>
					) : (
						<AvatarWithoutImg
							big
							up={screenSize === ScreenSizeEnum.Mobile ? false : true}
							classNameArg='border-2 border-black h-28 w-28 md:h-40 md:w-40 xl:w-46 xl-h46 xl2:h-52 xl2:w-52'
						/>
					)}
					<div className='md:w-9/12 pt-3 font-poppins flex flex-col md:ml-auto md:flex-row md:justify-between items-center text-center md:text-left'>
						<div>
							<div className='relative'>
								<p className=' font-bold text-2xl '>{typedUserInfo.fullName}</p>
								<p className=' font-bold text-sm opacity-20 hover:opacity-50 duration-300 cursor-default absolute top-0 -right-1 md:right-2 translate-x-3/4 translate-y-1/4'>
									@{typedUserInfo.loginData?.username}
								</p>
							</div>
							<p className=' text-md opacity-60'>{typedUserInfo.role}</p>
						</div>
						<button
							disabled
							className=' h-10 text-sm bg-gray-400 px-3 text-gray-300 rounded-3xl md:mr-5'
						>
							Edit Profile
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default ProfileViewInfo
