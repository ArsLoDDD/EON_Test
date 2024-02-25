import React from 'react'
//redux
import { RootState } from '../../../../redux/store'
import { useSelector } from 'react-redux'
//types
import { UserSocialMedia } from '../../../../types/userTypes'
//hooks
import useScreenSize, { ScreenSizeEnum } from '../../../../hooks/useScreenSize'
//components
import Avatar from '../../../Dashboard/LeftSide/ActiveUser/Avatar/Avatar'
import AvatarWithoutImg from '../../../Dashboard/LeftSide/ActiveUser/Avatar/AvatarWithoutImg/AvatarWithoutImg'
import SocialMediaView from '../SocialMediaView/SocialMediaView'

const ProfileViewInfo: React.FC = () => {
	//redux
	const userInfo = useSelector((state: RootState) => state.user.userData)
	//hooks
	const screenSize = useScreenSize()

	const typedUserInfo = userInfo as {
		fullName: string
		loginData: {
			username: string
		}
		role: string
		avatar: string | null
		socialMedia: UserSocialMedia
	}

	if (!typedUserInfo) return <h1>Loading</h1>

	return (
		<div className='md:h-2/5 pt-16 md:pt-0 rounded-b-3xl relative flex flex-col items-center'>
			{screenSize !== ScreenSizeEnum.Mobile && (
				<div className={`self-end mr-5 pt-2`}>
					<SocialMediaView socialMedia={typedUserInfo.socialMedia} />
				</div>
			)}
			<div className=' flex flex-col md:flex-row w-full items-center'>
				{typedUserInfo.avatar ? (
					<Avatar
						classNameArg={`h-36 w-36 md:h-40 md:w-40 xl:w-46 xl-h46 xl2:h-52 xl2:w-52 ${
							screenSize === ScreenSizeEnum.Mobile &&
							'border-4 border-purple-bg-item-menu'
						}`}
						up={screenSize === ScreenSizeEnum.Mobile ? false : true}
						url={typedUserInfo.avatar}
					/>
				) : (
					<AvatarWithoutImg
						big
						up={screenSize === ScreenSizeEnum.Mobile ? false : true}
						classNameArg={`border-2 border-black h-36 w-36 md:h-40 md:w-40 xl:w-46 xl-h46 xl2:h-52 xl2:w-52 ${
							screenSize === ScreenSizeEnum.Mobile &&
							'border-4 border-purple-bg-item-menu text-4xl'
						}`}
					/>
				)}
				<div className='md:w-9/12 pt-3 font-poppins flex flex-col md:ml-auto md:flex-row md:justify-between items-center text-center md:text-left'>
					<div className='flex flex-col '>
						<div className='relative'>
							<p className=' font-bold text-4xl md:text-2xl '>
								{typedUserInfo.fullName}
							</p>
							{screenSize !== ScreenSizeEnum.Mobile && (
								<p className='font-bold text-sm opacity-20 hover:opacity-50 duration-300 cursor-default absolute top-0 -right-1 md:right-2 translate-x-1 -translate-y-1/4'>
									@{typedUserInfo.loginData?.username}
								</p>
							)}
							{screenSize === ScreenSizeEnum.Mobile && (
								<p className='font-semibold text-2xl opacity-40 py-2'>
									@{typedUserInfo.loginData?.username}
								</p>
							)}
						</div>
						<p className='text-2xl md:text-md opacity-60'>
							{typedUserInfo.role}
						</p>
						{screenSize === ScreenSizeEnum.Mobile && (
							<div className={`mx-auto pt-5 mb-5`}>
								<SocialMediaView socialMedia={typedUserInfo.socialMedia} />
							</div>
						)}
					</div>
					<button className=' h-16 md:h-10 text-lg md:text-sm bg-purple-bg-item-menu px-12 md:px-3 text-white rounded-3xl md:mr-5'>
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProfileViewInfo
