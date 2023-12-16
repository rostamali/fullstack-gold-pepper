import AuthHeader from '@/components/shared/Auth/AuthHeader';
import VerifyEmail from '@/components/shared/Forms/VerifyEmail';
import { fetchVerifyEmailUser } from '@/lib/actions/auth.action';

const VerifyEmailPage = async () => {
	const { data } = await fetchVerifyEmailUser();

	return (
		<div className="auth-page">
			<div className="auth-form__wrap">
				<div className="auth-form">
					<AuthHeader
						title={'Verify your email'}
						subtitle={'to continue on Gold & Pepper'}
					/>
					{data && <VerifyEmail user={data} />}
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
