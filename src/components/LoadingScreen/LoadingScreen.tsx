import LogoIcon from '../Icons/LogoIcon'

const LoadingScreen: React.FC = () => {
	return (
		<div className='w-full h-full flex justify-center items-center  '>
			<div className=' '>
				<LogoIcon
					isLoadingScreen={true}
					className='fill-purple-bg-item-menu '
				/>
			</div>
		</div>
	)
}
export default LoadingScreen
