import { Keyword } from '../../redux/slices/keywordsSlice'
import { debounce } from 'lodash'
import SortIconHightToLow from './SortingBarIcons/SortIconHightToLow'
import SortIconLowToHight from './SortingBarIcons/SortIconLowToHight'
import _ from 'lodash'
import SortIconPikedLast from './SortingBarIcons/SortIconPikedLast'
import SortIconPikedFrst from './SortingBarIcons/SortIconPikedFrst'

export interface ISortingBarProps {
	keywordsArray: Keyword[]
	initialKeywordsArray: Keyword[]
	setKeywordsArray: React.Dispatch<React.SetStateAction<Keyword[]>>
}

const SortingBar: React.FC<ISortingBarProps> = ({
	keywordsArray,
	setKeywordsArray,
	initialKeywordsArray,
}) => {
	const handleFind = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			setKeywordsArray(initialKeywordsArray)
			return
		}
		const value = e.target.value.toLowerCase()
		const filteredArray = initialKeywordsArray.filter(keyword =>
			keyword.toLowerCase().includes(value)
		)
		setKeywordsArray(filteredArray)
	}, 150)

	const handleSortHightToLow = () => {
		const sortedArray = _.sortBy(keywordsArray, keyword => -keyword.length)
		setKeywordsArray(sortedArray)
	}
	const handleSortLowToHight = () => {
		const sortedArray = _.sortBy(keywordsArray, keyword => keyword.length)
		setKeywordsArray(sortedArray)
	}

	const handleSortPickedFirst = () => {
		const userKeywords = new Set(
			JSON.parse(localStorage.getItem('userKeywords') || '[]')
		)
		const sortedArray = [...keywordsArray].sort((a, b) => {
			const aInLocalStorage = userKeywords.has(a)
			const bInLocalStorage = userKeywords.has(b)
			if (aInLocalStorage && !bInLocalStorage) {
				return -1
			} else if (!aInLocalStorage && bInLocalStorage) {
				return 1
			} else {
				return 0
			}
		})
		setKeywordsArray(sortedArray)
	}

	const handleSortPickedLast = () => {
		const userKeywords = new Set(
			JSON.parse(localStorage.getItem('userKeywords') || '[]')
		)
		const sortedArray = [...keywordsArray].sort((a, b) => {
			const aInLocalStorage = userKeywords.has(a)
			const bInLocalStorage = userKeywords.has(b)
			if (aInLocalStorage && !bInLocalStorage) {
				return 1
			} else if (!aInLocalStorage && bInLocalStorage) {
				return -1
			} else {
				return 0
			}
		})
		setKeywordsArray(sortedArray)
	}

	return (
		<div className='pt-4 mb-4 w-9/12 md:w-1/2 ml-auto flex gap-4 items-center mr-5  '>
			<div className='flex'>
				<SortIconHightToLow sortFun={handleSortHightToLow} />
				<SortIconLowToHight sortFun={handleSortLowToHight} />
				<SortIconPikedFrst sortFun={handleSortPickedFirst} />
				<SortIconPikedLast sortFun={handleSortPickedLast} />
			</div>
			<input
				placeholder='Find keyword'
				className='py-2 px-3  rounded-md bg-slate-100 text-slate-600 border-purple-bg-item-menu border font-bold '
				type='text'
				onChange={handleFind}
			/>
		</div>
	)
}
export default SortingBar
