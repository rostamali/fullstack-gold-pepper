import AuthHeader from '@/components/shared/Auth/AuthHeader';
import VerifyEmail from '@/components/shared/Forms/VerifyEmail';
import { fetchVerifyEmailUser } from '@/lib/actions/auth.action';
export const metadata = {
	title: 'Verify Your Email | Gold & Pepper',
	description:
		'Complete the email verification process for Gold & Pepper. Ensure the security of your account and enjoy full access to our services.',
};

const VerifyEmailPage = async () => {
	const result:
		| {
				success: boolean;
				data: RegisterUser;
		  }
		| undefined = await fetchVerifyEmailUser();

	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Verify your email'}
						subtitle={'to continue on Gold & Pepper'}
					/>
					{result && <VerifyEmail user={result.data} />}
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
