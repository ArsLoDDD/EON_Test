import React, { ChangeEventHandler } from 'react'

interface CustomInputProps {
	type?: 'text' | 'password'
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
	type = 'text',
	value,
	onChange,
	placeholder = '',
}) => {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	)
}

export default CustomInput
