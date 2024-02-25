import { useEffect, useState } from 'react'
//redux
import { Keyword, setKeywords } from '../redux/slices/keywordsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
//api
import { fetchKeywords } from '../api/fetchKeywords'
//components
import KeywordsForm from '../components/Forms/KeywordsForm/KeywordsForm'
import SortingBar from '../components/SortingBar/SortingBar'
import KeywordsItems from '../components/KeywordsItem/KeywordsItems/KeywordsItems'

const KeywordsPage: React.FC = () => {
	//state
	const [currentKeywordsArray, setCurrentKeywordsArray] = useState<Keyword[]>(
		[]
	)
	const [initialKeywordsArray, setInitialKeywordsArray] = useState<Keyword[]>(
		[]
	)
	//redux
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
		//fetch keywords
		;(async () => {
			const data: Keyword[] = await fetchKeywords()
			setCurrentKeywordsArray(data)
			setInitialKeywordsArray(data)
			dispatch(setKeywords(data))
		})()
	}, [dispatch])

	useEffect(() => {
		//set keywords and update 
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
			<KeywordsItems
				currentKeywordsArray={currentKeywordsArray}
				userKeywords={userKeywords}
			/>
			<div className='h-1/4 flex justify-center items-center'>
				<KeywordsForm />
			</div>
		</div>
	)
}
export default KeywordsPage
