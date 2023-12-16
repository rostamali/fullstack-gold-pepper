import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import Signup from '@/components/shared/Forms/Signup';

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
