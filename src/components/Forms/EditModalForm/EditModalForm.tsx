//react
import React, { useEffect, useState } from 'react'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'

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
import { closeEditModal, setNewUserInfo } from '../../../redux/slices/userSlice'
import { ProfileViewInfoProps } from '../../PageContent/ProfileView/ProfileViewInfo/ProfileViewInfo'

const initialValues = {
	//initial and only these values for true auth
	firstName: '',
	lastName: '',
	email: '',
}

const validationSchema = Yup.object().shape({
	//login validation
	fullName: Yup.string()
		.min(2, 'First name is too short')
		.max(50, 'First name is too long'),
	username: Yup.string()
		.min(2, 'Username is too short')
		.max(12, 'Username is too long'),
})

export interface EditModalFormProps {
	fullName: string
	loginData: {
		username: string
	}
}

const EditModalForm: React.FC = () => {
	//redux
	const dispatch: AppDispatch = useDispatch()
	const userData = useSelector((state: RootState) => {
		if (state.user.userData) {
			return {
				fullName: state.user.userData.fullName,
				username: state.user.userData.loginData.username,
			}
		}
	})
	//router

	const handleSubmit = (values: any) => {
		// user update simulation
		// console.log('EditModalForm submitted:', values)
		const newUserInfoData = {
			fullName: values.fullName ? values.fullName : userData?.fullName,
			loginData: {
				username: values.username ? values.username : userData?.username,
			},
		}

		dispatch(setNewUserInfo(newUserInfoData))
		dispatch(closeEditModal())
	}

	return (
		<FormWrapper
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			btnText='Save'
			linkArgs={{
				text: '',
				to: '',
			}}
			isBig={true}
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
					type='username'
					id='username'
					name='username'
					component={CustomInput}
				/>
			</div>
		</FormWrapper>
	)
}

export default EditModalForm
