import React from 'react'
import { Formik, Form } from 'formik'
import LogoIcon from '../../Icons/LogoIcon'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface FormWrapperProps {
	initialValues: any
	validationSchema: any
	onSubmit: (values: any) => void
	isLoading?: boolean
	isBig?: boolean
	linkArgs?: {
		text: string
		to: string
	}
	isErrorAuth?: boolean
	errorMessage?: string
	btnText?: string
	children: React.ReactNode
}

const FormWrapper: React.FC<FormWrapperProps> = ({
	initialValues,
	validationSchema,
	onSubmit,
	isLoading,
	children,
	isBig = false,
	linkArgs = { text: 'Don`t have an account?', to: '/signup' },
	isErrorAuth = false,
	btnText = 'Sign In',
	errorMessage,
}) => {
	return (
		<motion.div
			className={`bg-white md:rounded-3xl h-screen ${
				isBig ? 'md:h-fit py-5' : 'md:h-1/2 '
			} w-full md:w-10/12 md2:w-9/12 md3:w-8/12 md4:w-7/12 lg:w-6/12 lg2:w-6/12 lg3:w-6/12 xl:w-5/12 flex flex-col justify-center items-center`}
			initial={{ opacity: 0, y: -300 }}
			animate={{ opacity: 1, y: [-300, -100, 40, -20, 10, 0] }}
			transition={{ duration: 1.3 }}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isValid }) => (
					<Form className='bg-white w-8/12 flex flex-col gap-4 justify-center items-center font-poppins'>
						{children}
						{!isErrorAuth && !isLoading && (
							<motion.button
								initial={{ scale: 0 }}
								animate={{
									scale: 1,
									transition: { delay: 1.3, duration: 0.5, ease: 'linear' },
								}}
								className={`${
									isValid
										? 'bg-purple-bg-item-menu text-white hover:bg-purple-800 duration-300'
										: 'bg-gray-500 text-white opacity-40'
								} px-7 py-2 rounded-lg mb-5 text-lg`}
								type='submit'
								disabled={!isValid}
							>
								{btnText}
							</motion.button>
						)}
						{isErrorAuth && !isLoading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { delay: 0.2, duration: 1.3 },
								}}
								exit={{ opacity: 0, transition: { delay: 0.7 } }}
								className={`px-7 py-2.5 rounded-lg mb-5 bg-purple-bg-item-menu text-white whitespace-nowrap cursor-default animate-bounce`}
							>
								{errorMessage}
							</motion.div>
						)}
						{isLoading && (
							<div className='animate-spin'>
								<LogoIcon className='w-10 h-10 fill-purple-bg-item-menu' />
							</div>
						)}
					</Form>
				)}
			</Formik>
			{linkArgs && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 1.7, duration: 1.3 },
					}}
					exit={{ opacity: 0, transition: { delay: 0.7 } }}
				>
					<Link to={linkArgs.to} className='text-purple-bg-item-menu'>
						{linkArgs.text}
					</Link>
				</motion.div>
			)}
		</motion.div>
	)
}

export default FormWrapper
