import React from 'react'

export interface AvatarProps {
	url?: string
	up?: boolean
}

const Avatar: React.FC<AvatarProps & { classNameArg: string }> = ({
	url,
	up,
	classNameArg,
}) => {
	return (
		<img
			src={url}
			alt=''
			className={`rounded-full object-cover ${
				up && ' absolute -translate-y-1/2 top-0 ml-5'
			} ${classNameArg}`}
		/>
	)
}

export default Avatar
