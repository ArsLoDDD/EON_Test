import React from 'react'
//hooks
import useScreenSize, {
	ScreenSizeEnum,
} from '../../../../../hooks/useScreenSize'
//types
import { ProfileViewIconProps } from './SocialMediaViewIcons/facebookViewIcon'

export interface ISocialMediaViewIconProps {
	icon: React.FC<ProfileViewIconProps>
	link: string
}

const SocialMediaViewIcon: React.FC<ISocialMediaViewIconProps> = ({
	icon,
	link,
}) => {
	//hooks
	const screenSize = useScreenSize()

	return (
		<a
			href={link}
			target='_blank'
			rel='noopener noreferrer'
			className=' rounded-full'
		>
			{React.createElement(icon, {
				classNameArg: ' hover:scale-110 duration-300',
				size: screenSize === ScreenSizeEnum.Mobile ? '80' : '40',
			})}
		</a>
	)
}

export default SocialMediaViewIcon
