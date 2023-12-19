import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import ForgotPassword from '@/components/shared/Forms/ForgotPassword';
export const metadata = {
	title: 'Forgot Password | Gold & Pepper',
	description:
		'Forgot your password? No worries! Recover access to your account on Gold & Pepper by resetting your password. Follow the simple steps to regain control',
};

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
