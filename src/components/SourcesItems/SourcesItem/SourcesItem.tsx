//router
import { Link } from 'react-router-dom'
//types
import { UsersConnectedSources } from '../../../types/userTypes'
//components
import Avatar from '../../Dashboard/LeftSide/ActiveUser/Avatar/Avatar'
import KeywordItem from '../../KeywordsItem/KeywordItem'
import SourcesItemFollowersIcon from './SourcesItemIcons/SourcesItemFollowersIcon'
import SourcesItemPostsIcon from './SourcesItemIcons/SourcesItemPostsIcon'

export interface SourcesItemProps {
	source: UsersConnectedSources
}
function formatNumber(num: number): string {
	// 1k = 1000
	if (num >= 1000 && num < 1000000) {
		return (num / 1000).toFixed(1) + 'K'
	} else if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M'
	} else {
		return num.toString()
	}
}
const SourcesItem: React.FC<SourcesItemProps> = ({ source }) => {
	return (
		<Link
			to={`/source/${source.name.toLocaleLowerCase()}`}
			style={{
				backgroundImage: `url(${source.bgImage})`,
				backgroundSize: 'cover',
			}}
			className='w-11/12 mx-auto flex flex-col gap-2 bg-red-300 relative py-5 px-3 rounded-2xl group hover:scale-110 duration-200 hover:drop-shadow-2xl  font-poppins'
		>
			<div className='flex  items-center justify-between'>
				<div className='flex items-center gap-10'>
					{source.logo && (
						<Avatar
							url={source.logo}
							classNameArg='w-20 h-20 group-hover:scale-110 duration-200'
						/>
					)}
					<p className='text-white text-xl font-bold'>{source.name}</p>
				</div>
				<div
					onClick={e => {
						e.preventDefault()
					}}
					className='flex flex-col justify-center items-center bg-white rounded-xl py-1 px-2 text-xs select-text'
				>
					<span>Login: {source.connectedAccountData.username}</span>
					<span>Password: {source.connectedAccountData.username}</span>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<div className='flex  gap-2'>
					<div className='flex items-center gap-1 bg-white py-1 px-2 rounded-xl '>
						<SourcesItemFollowersIcon classNameArg='h-5 w-5 ' />
						<span className='font-bold text-xs'>
							{formatNumber(source.connectedAccountData.followers)}
						</span>
					</div>
					<div className='flex items-center gap-1 bg-white py-1 px-2 rounded-xl '>
						<SourcesItemFollowersIcon classNameArg='h-5 w-5 ' />
						<span className='font-bold text-xs'>
							{formatNumber(source.connectedAccountData.followers)}
						</span>
					</div>
					<div className='flex items-center gap-1 bg-white py-1 px-2 rounded-xl '>
						<SourcesItemPostsIcon classNameArg='h-5 w-5 ' />
						<span className='font-bold text-xs'>
							{formatNumber(source.connectedAccountData.followers)}
						</span>
					</div>
				</div>

				<div className='flex gap-2'>
					{source.categories.map((keyword, key) => {
						return (
							<KeywordItem
								keyword={keyword}
								isPicked={false}
								classNameArg='text-xs'
							/>
						)
					})}
				</div>
			</div>
		</Link>
	)
}
export default SourcesItem
