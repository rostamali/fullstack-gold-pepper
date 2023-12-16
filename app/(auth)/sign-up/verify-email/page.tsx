import AuthHeader from '@/components/shared/Auth/AuthHeader';
import VerifyEmail from '@/components/shared/Forms/VerifyEmail';

const VerifyEmailPage = () => {
	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Verify your email'}
						subtitle={'to continue on Gold & Pepper'}
					/>
					<VerifyEmail />
					<div className="auth-form__footer">
						<p className="text-base-3 text-link">
							Didn't receive a code? Resend
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmailPage;
