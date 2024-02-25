//types
import { UsersConnectedSources } from '../../types/userTypes'
//components
import SourcesItem from './SourcesItem/SourcesItem'

interface SourcesItemsProps {
	sources: UsersConnectedSources[]
}

const SourcesItems: React.FC<SourcesItemsProps> = ({ sources }) => {
	return (
		<div className='w-11/12 flex flex-col gap-4 '>
			{sources.map((source, index) => {
				return <SourcesItem source={source} key={source.id} />
			})}
		</div>
	)
}

export default SourcesItems
