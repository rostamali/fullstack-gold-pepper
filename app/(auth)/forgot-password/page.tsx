import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import ForgotPassword from '@/components/shared/Forms/ForgotPassword';

const ForgotPasswordPage = () => {
	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Forgot password'}
						subtitle={
							"Enter your email and we'll send you a link to reset your password"
						}
					/>
					<ForgotPassword />
					<AuthFooter
						text={'Back to'}
						link={'/sign-in'}
						linkText={'Sign in'}
					/>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
