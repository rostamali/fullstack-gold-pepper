import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import Signup from '@/components/shared/Forms/Signup';
export const metadata = {
	title: 'Create a New Account | Gold & Pepper',
	description:
		'Join Gold & Pepper today! Sign up to unlock exclusive features and personalized content. It only takes a few minutes to get started',
};

const SignupPage = () => {
	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Create your account'}
						subtitle={'to continue on Gold & Pepper'}
					/>
					<Signup />
					<AuthFooter
						text={'Already have an account?'}
						link={'/sign-in'}
						linkText={'Sign in'}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
