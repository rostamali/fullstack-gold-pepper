import AuthFooter from '@/components/shared/Auth/AuthFooter';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import ResetPassword from '@/components/shared/Forms/ResetPassword';

const ResetPasswordPage = () => {
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
					<ResetPassword />
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
