
//redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
//types
import { IUser } from '../types/userTypes'
//components
import SourcesItems from '../components/SourcesItems/SourcesItems'

const SourcesPage: React.FC = () => {
	//redux
	const userSources = useSelector((state: RootState) => {
		if (state.user.userData && 'connectedSources' in state.user.userData) {
			return (state.user.userData as IUser).connectedSources
		}
		return null
	})

	if (!userSources) return <h1>Loading</h1>
	return (
		<div className='w-full flex justify-center pt-5 '>
			<SourcesItems sources={userSources} />
		</div>
	)
}
export default SourcesPage
