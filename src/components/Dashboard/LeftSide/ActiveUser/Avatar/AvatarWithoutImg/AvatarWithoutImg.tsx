// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../redux/store'
// components
import { AvatarProps } from '../Avatar'

const AvatarWithoutImg: React.FC<
	AvatarProps & { classNameArg?: string; big?: boolean }
> = ({ up, classNameArg, big }) => {
	// redux
	const userData = useSelector((state: RootState) => state?.user?.userData)
	const typedUserData = userData as { fullName: string }
	return (
		<div
			className={`rounded-full text-2xl ${classNameArg} border-gray-100 border flex items-center justify-center bg-slate-200 ${
				big && 'w-28 h-28  md:ml-5'
			} ${up && 'absolute -translate-y-1/2 top-0'} ${classNameArg} select-none`}
		>
			{typedUserData.fullName && typedUserData.fullName.charAt(0)}
		</div>
	)
}

export default AvatarWithoutImg
