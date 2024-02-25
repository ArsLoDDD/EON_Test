//types
import { SourceDataPosts } from '../../types/sourceTypes'
//components
import SourcePost from './SourcePost/SourcePost'

export interface SourcePostsProps {
	source: SourceDataPosts[]
}

const SourcePosts: React.FC<SourcePostsProps> = ({ source }) => {
	return (
		<div className=' flex flex-col gap-2 items-center md:'>
			{source.map((post, index) => {
				return <SourcePost key={index} post={post} />
			})}
		</div>
	)
}
export default SourcePosts
