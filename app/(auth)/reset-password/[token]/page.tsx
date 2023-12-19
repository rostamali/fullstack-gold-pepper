import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import ResetPassword from '@/components/shared/Forms/ResetPassword';
import { fetchForgotPasswordToken } from '@/lib/actions/auth.action';
export const metadata = {
	title: 'Reset Your Password | Gold & Pepper',
	description:
		'Securely reset your password for Gold & Pepper. Follow the instructions to choose a new password and regain access to your account. Your security is our priority',
};

const ResetPasswordPage = async ({
	params: { token },
}: {
	params: {
		token: string;
	};
}) => {
	const result = await fetchForgotPasswordToken(token);
	if (!result || !result.success)
		throw new Error('Auth is required to access this resource');

	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Password reset'}
						subtitle={
							'New password should different from old password'
						}
					/>
					<ResetPassword token={token} />
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

export default ResetPasswordPage;
