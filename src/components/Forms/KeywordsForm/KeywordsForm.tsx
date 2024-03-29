// react
import { useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { Keyword, addNewKeyword } from '../../../redux/slices/keywordsSlice'
import { addKeyword } from '../../../redux/slices/userSlice'
import * as Yup from 'yup'
import { RootState } from '../../../redux/store'
//formik
import { useFormik } from 'formik'

const validationSchema = Yup.object().shape({
	//keyword validation
	newKeyword: Yup.string()
		.min(2, 'Keyword must be at least 3 characters')
		.max(20, 'Keyword must be at most 15 characters')
		.matches(/^[a-zA-Z\s]+$/, 'Keyword can only contain letters and spaces'),
})

const KeywordsForm: React.FC = () => {
	//state
	const [isIncluded, setIsIncluded] = useState(false)
	//redux
	const dispatch = useDispatch()
	const localKeywords: Keyword[] = useSelector(
		(state: RootState) => state.keywords.keywords
	)

	const formik = useFormik({
		initialValues: {
			newKeyword: '',
		},
		validationSchema,
		onSubmit: values => {
			//onSubmit
			handleAddKeyword(values.newKeyword)
		},
	})

	const handleAddKeyword = (newKeyword: string) => {
		//add keyword to local storage and redux
		if (newKeyword.length === 0) return
		newKeyword = newKeyword.toLowerCase()
		const oldData = JSON.parse(localStorage.getItem('userKeywords') || '[]')
		if (oldData.includes(newKeyword) || localKeywords.includes(newKeyword)) {
			setIsIncluded(true)
			return
		}
		const newData = [...oldData, newKeyword]
		localStorage.setItem('userKeywords', JSON.stringify(newData))
		dispatch(addKeyword(newKeyword))
		dispatch(addNewKeyword(newKeyword))
		formik.resetForm()
	}

	return (
		<div className='relative w-1/2 md:w-1/3 flex flex-col justify-center items-center font-poppins font-bold'>
			<input
				tabIndex={1}
				placeholder='Add new keyword'
				className={`w-full py-3 px-4 mb-4 rounded-md text-slate-600 bg-slate-100 placeholder:capitalize border ${
					formik.touched.newKeyword && formik.errors.newKeyword
						? 'border-red-500'
						: 'border-purple-bg-item-menu'
				}`}
				type='text'
				onChange={e => {
					setIsIncluded(false)
					formik.handleChange(e)
				}}
				onBlur={formik.handleBlur}
				value={formik.values.newKeyword}
				name='newKeyword'
				onKeyPress={e => {
					if (e.key === 'Enter') {
						e.preventDefault()
						formik.handleSubmit()
					}
				}}
			/>
			{formik.touched.newKeyword && formik.errors.newKeyword && (
				<div className='absolute -top-1/4 text-red-500 text-sm whitespace-nowrap capitalize'>
					{formik.errors.newKeyword}
				</div>
			)}
			<div
				onClick={() => formik.handleSubmit()}
				className='py-2 px-3 bg-green-500 hover:bg-green-600 duration-300 rounded-md text-white cursor-pointer capitalize'
			>
				Add Keyword
			</div>
			{isIncluded && (
				<div className='absolute -top-1/4 text-red-500 text-sm whitespace-nowrap capitalize'>
					Keyword already included
				</div>
			)}
		</div>
	)
}
export default KeywordsForm
