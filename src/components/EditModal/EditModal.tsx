import { useDispatch } from 'react-redux'
import { closeEditModal } from '../../redux/slices/userSlice'
import EditModalForm from '../Forms/EditModalForm/EditModalForm'

interface EditModalProps {
	isOpen: boolean
	onClose?: () => void
}

const EditModal: React.FC<EditModalProps> = ({ isOpen = false, onClose }) => {
	const dispatch = useDispatch()
	if (!isOpen) return null
	return (
		<div
			onClick={e => {
				if (e.target === e.currentTarget) {
					dispatch(closeEditModal())
				}
			}}
			className='absolute w-screen h-screen bg-black bg-opacity-70 z-1000 flex justify-center items-center'
		>
			<EditModalForm />
		</div>
	)
}
export default EditModal
