import React, { useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { clearError } from '../../../redux/slices/authSlice'
//router
import { useNavigate } from 'react-router-dom'

//formik
import { Field } from 'formik'
//yup
import * as Yup from 'yup'
import CustomInput from '../customInput'
//animation
import { motion } from 'framer-motion'
//components
import FormWrapper from '../FormWrapper/FormWrapper'
import LogoIcon from '../../Icons/LogoIcon'

const initialValues = {
	fullName: '',
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const validationSchema = Yup.object().shape({
	//signup validation
	fullName: Yup.string()
		.required('Full Name is required')
		.min(6, 'Full Name is too short')
		.max(20, 'Full Name is too long')
		.matches(/^[a-zA-Z\s]*$/, 'Only letters and spaces')
		.required('Full Name is required'),
	username: Yup.string().required('Username is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password is too short'),
	confirmPassword: Yup.string()
		.oneOf(
			[Yup.ref('password'), null] as (
				| string
				| Yup.Reference<unknown>
				| undefined
			)[],
			'Passwords must match'
		)
		.required('Password is required'),
})

const SignUpForm: React.FC<{
	link: {
		text: string
		to: string
	}
}> = ({ link }) => {
	//state
	const [isError, setIsError] = useState(false)
	//redux
	const dispatch: AppDispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.auth.loading)

	//on this time we don't need to use these
	// const error = useSelector((state: RootState) => state.auth.error)
	// const errorMessage = useSelector(
	// 	(state: RootState) => state.auth.errorMessage
	// )
	
	//router
	const navigate = useNavigate()

	const handleSubmit = (values: {
		fullName: string
		username: string
		email: string
		password: string
		confirmPassword: string
	}) => {
		// reg simulation
		console.log('RegisterForm submitted:', values)
		// dispatch(userRegister(values))
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
			isBig={true}
			linkArgs={{ text: link.text, to: link.to }}
			btnText='Sign Up'
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
					htmlFor='fullName'
				>
					Full Name
				</motion.label>
				<Field
					type='text'
					id='fullName'
					name='fullName'
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
					htmlFor='email'
				>
					Email
				</motion.label>
				<Field
					type='email'
					id='email'
					name='email'
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
			<div className='w-10/12 mx-auto relative'>
				<motion.label
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 1.1, duration: 1.3 },
					}}
					exit={{ opacity: 0, transition: { delay: 0.7 } }}
					htmlFor='confirmPassword'
				>
					Confirm Password
				</motion.label>
				<Field
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					component={CustomInput}
					disabled={isLoading}
					onFocus={handleErrorMessage}
				/>
			</div>
		</FormWrapper>
	)
}

export default SignUpForm
