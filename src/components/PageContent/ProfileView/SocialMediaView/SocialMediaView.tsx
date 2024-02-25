// types
import { UserSocialMedia } from '../../../../types/userTypes'
//components
import SocialMediaViewIcon from './SocialMediaViewIcon/SocialMediaViewIcon'
import FacebookViewIcon from './SocialMediaViewIcon/SocialMediaViewIcons/facebookViewIcon'
import LinkedinViewIcon from './SocialMediaViewIcon/SocialMediaViewIcons/linkedinViewIcon'
import TelegramViewIcon from './SocialMediaViewIcon/SocialMediaViewIcons/telegramViewIcon'

interface SocialMediaViewProps {
	socialMedia: UserSocialMedia
}

const socialMediaIcons: {
	[key: string]: React.FC
} = {
	facebook: FacebookViewIcon,
	linkedin: LinkedinViewIcon,
	telegram: TelegramViewIcon,
}
const SocialMediaView: React.FC<SocialMediaViewProps> = ({ socialMedia }) => {
	if (!socialMedia) return <h1>Loading</h1>
	return (
		<div className='flex'>
			{Object.entries(socialMedia).map(([key, value]) => {
				if (value) {
					return (
						<SocialMediaViewIcon
							key={key}
							link={value}
							icon={socialMediaIcons[key]}
						/>
					)
				}
			})}
		</div>
	)
}

export default SocialMediaView
