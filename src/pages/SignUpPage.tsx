import SignUpForm from '../components/Forms/SignUpForm/SignUpForm'

const SignUpPage: React.FC = () => {
	return (
		<div className='bg-white md:bg-gradient-to-br from-purple-bg-item-menu via-sky-500  to-purple-400 w-full h-screen'>
			<div className='w-full h-full flex justify-center items-center'>
				<SignUpForm link={{ text: 'Already have an account?', to: '/login' }} />
			</div>
		</div>
	)
}
export default SignUpPage
