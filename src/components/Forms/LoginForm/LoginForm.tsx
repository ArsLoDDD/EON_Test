//react
import React, { useEffect, useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { clearError, userAuth } from '../../../redux/slices/authSlice'
//router
import { useNavigate } from 'react-router-dom'
//formik
import { Field } from 'formik'
//yup
import * as Yup from 'yup'
//animation
import { motion } from 'framer-motion'
//components
import CustomInput from '../customInput'
import LogoIcon from '../../Icons/LogoIcon'
import FormWrapper from '../FormWrapper/FormWrapper'

const initialValues = {
	//initial and only this values for true auth
	username: 'test_user1',
	password: 'test_password1',
}

const validationSchema = Yup.object().shape({
	//login validation
	username: Yup.string()
		.required('Username is required')
		.min(6, 'Username is too short')
		.max(20, 'Username is too long'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password is too short'),
})

const LoginForm: React.FC = () => {
	//state
	const [isError, setIsError] = useState(false)
	//redux
	const dispatch: AppDispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.auth.loading)
	const isErrorMessage = useSelector(
		(state: RootState) => state.auth.errorMessage
	)
	const error = useSelector((state: RootState) => state.auth.error)
	//router
	const navigate = useNavigate()

	useEffect(() => {
		if (error) {
			setIsError(true)
		}
	}, [error])

	const handleSubmit = (values: any) => {
		// auth simulation
		console.log('LoginForm submitted:', values)
		dispatch(userAuth(values))
		if (!isError) {
			navigate('/')
		}
	}

	const handleErrorMessage = () => {
		//clear error message
		if (isError) {
			setIsError(false)
			dispatch(clearError())
		}
	}

	return (
		<FormWrapper
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			isErrorAuth={isError}
			errorMessage={isErrorMessage}
		>
			<LogoIcon isForm={true} className='w-36 h-36' />
			<div className='w-10/12 mx-auto relative'>
				<motion.label
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 1.1, duration: 1.3 },
					}}
					exit={{ opacity: 0, transition: { delay: 0.7 } }}
					htmlFor='username'
				>
					Username
				</motion.label>
				<Field
					type='text'
					id='username'
					name='username'
					component={CustomInput}
					disabled={isLoading}
					onFocus={handleErrorMessage}
				/>
			</div>
			<div className='w-10/12 mx-auto relative'>
				<motion.label
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 1.1, duration: 1.3 },
					}}
					exit={{ opacity: 0, transition: { delay: 0.7 } }}
					htmlFor='password'
				>
					Password
				</motion.label>
				<Field
					type='password'
					id='password'
					name='password'
					component={CustomInput}
					disabled={isLoading}
					onFocus={handleErrorMessage}
				/>
			</div>
		</FormWrapper>
	)
}

export default LoginForm
