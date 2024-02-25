//redux
import { Keyword } from '../../../redux/slices/keywordsSlice'
//components
import LogoIcon from '../../Icons/LogoIcon'
import KeywordItem from '../KeywordItem'

export interface KeywordsItemsProps {
	currentKeywordsArray: Keyword[]
	userKeywords: Keyword[]
	isDeleteble?: boolean
}
const KeywordsItems: React.FC<KeywordsItemsProps> = ({
	currentKeywordsArray,
	userKeywords,
	isDeleteble = true,
}) => {
	return (
		<div className='w-full h-2/3 overflow-scroll border-b-2 rounded-2xl bg-slate-100 drop-shadow-md'>
			<div className='flex flex-wrap gap-1.5 p-5'>
				{currentKeywordsArray.map((keyword, index) => {
					const isPicked = userKeywords.includes(keyword)
					return (
						<KeywordItem
							key={index}
							keyword={keyword}
							isPicked={isPicked}
							isDeleteble={isDeleteble}
						/>
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
	)
}
export default KeywordsItems
