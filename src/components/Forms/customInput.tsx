import React from 'react'
import ErrorIcon from './ErrorIcon'
import { motion } from 'framer-motion'

const CustomInput: React.FC<any> = ({
	field,
	form: { touched, errors },
	...props
}) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1, transition: { delay: 0.7, duration: 1.3 } }}
		exit={{ opacity: 0, transition: { delay: 0.7 } }}
		className='my-2 relative'
	>
		<input
			{...field}
			{...props}
			className='w-full py-3 px-3 rounded-lg border-purple-bg-item-menu border-1 outline-violet-600 text-gray-500'
		/>
		{touched[field.name] && errors[field.name] && (
			<>
				<div className='absolute -top-8 -right-5 text-red-600  opacity-70 scale-70 '>
					{errors[field.name]}
				</div>
				<ErrorIcon classNameArgs='absolute text-red-400 h-8 w-8 top-2 right-2 ' />
			</>
		)}
	</motion.div>
)

export default CustomInput
