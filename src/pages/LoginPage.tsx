import LoginForm from '../components/Forms/LoginForm/LoginForm'

const LoginPage: React.FC = () => {
	return (
		<div className='bg-white md:bg-gradient-to-br from-purple-bg-item-menu via-sky-500  to-purple-400 w-full h-screen'>
			<div className='w-full h-full flex justify-center items-center'>
				<LoginForm />
			</div>
		</div>
	)
}
export default LoginPage
