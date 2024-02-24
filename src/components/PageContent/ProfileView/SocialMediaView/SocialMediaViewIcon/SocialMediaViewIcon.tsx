import React from 'react'
import { ProfileViewIconProps } from './SocialMediaViewIcons/facebookViewIcon'
import useScreenSize, {
	ScreenSizeEnum,
} from '../../../../../hooks/useScreenSize'

export interface ISocialMediaViewIconProps {
	icon: React.FC<ProfileViewIconProps>
	link: string
}

const SocialMediaViewIcon: React.FC<ISocialMediaViewIconProps> = ({
	icon,
	link,
}) => {
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
