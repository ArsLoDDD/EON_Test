import React, { useEffect, useState } from 'react'
//redux
import { Keyword } from '../../../redux/slices/keywordsSlice'
//hooks
import useScreenSize, { ScreenSizeEnum } from '../../../hooks/useScreenSize'
//components
import ProfileViewBg from './ProfileViewBg/ProfileViewBg'
import ProfileViewInfo from './ProfileViewInfo/ProfileViewInfo'
import LogoutButton from './LogoutButton/LogoutButton'
import KeywordsItems from '../../KeywordsItem/KeywordsItems/KeywordsItems'

const ProfileView: React.FC = () => {
	//state
	const [userKeywords, setUserKeywords] = useState<Keyword[] | []>([])
	//hooks
	const screenSize = useScreenSize()

	useEffect(() => {
		//get user keywords from local storage
		setUserKeywords(JSON.parse(localStorage.getItem('userKeywords') || '[]'))
	}, [])
	return (
		<div className=' pt-5'>
			{screenSize !== ScreenSizeEnum.Mobile && (
				<div className='bg-slate-100 w-full md:w-11/12 md:h-2/5 mx-auto rounded-3xl '>
					<ProfileViewBg />
					<ProfileViewInfo />
				</div>
			)}
			<div className=' w-full md:w-10/12 md:h-3/6 mx-auto bg-slate-100 rounded-b-3xl flex relative'>
				<div className='w-full h-full flex flex-col justify-between items-center'>
					{screenSize === ScreenSizeEnum.Mobile && <ProfileViewInfo />}
					<div className='w-3/4 h-3/5'>
						<KeywordsItems
							currentKeywordsArray={userKeywords}
							userKeywords={userKeywords}
							isDeleteble={false}
						/>
					</div>

					<LogoutButton />
				</div>
			</div>
		</div>
	)
}

export default ProfileView
