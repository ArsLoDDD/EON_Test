import React from 'react'

//need to rework this component
const ProfileViewBg: React.FC = () => {
	return (
		<div className='relative md:h-3/5 rounded-t-3xl'>
			<img
				className='w-full h-full bg-purple-bg-item-menu object-cover rounded-t-3xl '
				src='https://random.imagecdn.app/1920/1080'
				alt=''
			/>
		</div>
	)
}

export default ProfileViewBg
