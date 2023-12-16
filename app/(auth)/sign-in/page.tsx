import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import Signin from '@/components/shared/Forms/Signin';

const SigninPage = () => {
	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Sign in'}
						subtitle={'to continue on Gold & Pepper'}
					/>
					<Signin />
					<AuthFooter
						text={"Don't have an account?"}
						link={'/sign-up'}
						linkText={'Sign up'}
					/>
				</div>
			</div>
		</div>
	);
};

export default SigninPage;
