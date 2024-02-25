const ChevronRight: React.FC<{ isActive?: boolean }> = ({
	isActive = false,
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke={!isActive ? '#9197B3' : 'white'}
			className={`duration-1000 ${
				isActive ? ' transform rotate-90 w-6 h-6' : 'w-4 h-4'
			}`}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m8.25 4.5 7.5 7.5-7.5 7.5'
			/>
		</svg>
	)
}

export default ChevronRight
