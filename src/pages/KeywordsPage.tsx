import { useEffect, useLayoutEffect, useState } from 'react'
import KeywordItem from '../components/KeywordsItem/KeywordItem'
import { Keyword, setKeywords } from '../redux/slices/keywordsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeywords } from '../api/fetchKeywords'
import { RootState } from '../redux/store'
import KeywordsForm from '../components/Forms/KeywordsForm/KeywordsForm'
import SortingBar from '../components/SortingBar/SortingBar'
import LogoIcon from '../components/Icons/LogoIcon'

const KeywordsPage: React.FC = () => {
	const [currentKeywordsArray, setCurrentKeywordsArray] = useState<Keyword[]>(
		[]
	)
	const [initialKeywordsArray, setInitialKeywordsArray] = useState<Keyword[]>(
		[]
	)
	const dispatch = useDispatch()

	const localKeywords = useSelector(
		(state: RootState) => state.keywords.keywords
	)
	const userKeywords = useSelector((state: RootState) => {
		const userData = state.user.userData
		if (userData && 'keywords' in userData) {
			return userData.keywords
		}
		return []
	})
	useEffect(() => {
		;(async () => {
			const data: Keyword[] = await fetchKeywords()
			setCurrentKeywordsArray(data)
			setInitialKeywordsArray(data)
			dispatch(setKeywords(data))
		})()
	}, [dispatch])

	useEffect(() => {
		setCurrentKeywordsArray(localKeywords)
		setInitialKeywordsArray(localKeywords)
	}, [localKeywords])

	if (localKeywords.length === 0) {
		return <div>Loading...</div>
	}
	return (
		<div className='w-full  z-10'>
			<SortingBar
				keywordsArray={currentKeywordsArray}
				setKeywordsArray={setCurrentKeywordsArray}
				initialKeywordsArray={initialKeywordsArray}
			/>
			<div className='w-full h-2/3 overflow-scroll border-b-2 rounded-2xl bg-slate-100 drop-shadow-md'>
				<div className='flex flex-wrap gap-1.5 p-5'>
					{currentKeywordsArray.map((keyword, index) => {
						const isPicked = userKeywords.includes(keyword)
						return (
							<KeywordItem key={index} keyword={keyword} isPicked={!isPicked} />
						)
					})}
				</div>
				{currentKeywordsArray.length === 0 && (
					<div className='w-full h-2/3 flex flex-col justify-center items-center text-2xl font-bold text-purple-bg-item-menu'>
						<LogoIcon
							isLoadingScreen={true}
							className='fill-purple-bg-item-menu'
						/>
						<span className=' font-poppins capitalize'> no keywords found</span>
					</div>
				)}
			</div>
			<div className='h-1/4 flex justify-center items-center'>
				<KeywordsForm />
			</div>
		</div>
	)
}
export default KeywordsPage
