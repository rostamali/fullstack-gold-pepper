'use client';
import { verifyUserEmail } from '@/lib/actions/auth.action';
import { useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import OTPInput from 'react-otp-input';
import ButtonLoader from '../Spinners/ButtonLoader';
import { useRouter } from 'next/navigation';

type EmailVerifyProps = {
	user: RegisterUser;
};

const VerifyEmail: React.FC<EmailVerifyProps> = ({ user }) => {
	const [otp, setOtp] = useState<string>('');
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const handleOtpChange = (otpValue: string) => {
		setOtp(otpValue);
		if (otpValue.length === 4) {
			handleSubmitCode(otpValue);
		}
	};

	const handleSubmitCode = async (otpValue: string) => {
		setIsPending(true);
		try {
			const result = await verifyUserEmail({ code: otpValue });
			console.log(result);
			setIsPending(false);
			if (result) {
				router.push('/sign-in');
			}
		} catch (error) {
			setIsPending(false);
			console.log(error);
			setOtp('');
		}
	};

	return (
		<div className="auth-form__input-space">
			<div className="flex items-center gap-[5px] bg-[#f6f6f6] p-[12px] rounded-md">
				<FaCircleUser className="text-[16px] text-[#8d8181]" />
				<span className="text-base-4">{user?.email}</span>
			</div>
			<div className="flex flex-col gap-[6px]">
				<h4 className="heading-4 !text-primary-black-dark">
					Verification code
				</h4>
				<p className="text-base-4">
					Enter the verification code sent to your email address
				</p>
			</div>
			<div className="flex items-center gap-[6px]">
				<OTPInput
					inputType="number"
					value={otp}
					onChange={handleOtpChange}
					numInputs={4}
					renderSeparator={<span className="mx-[4px]"></span>}
					renderInput={(props) => (
						<input {...props} disabled={isPending} />
					)}
					inputStyle="border-b-2 border-primary-black-thin duration-100 focus:border-b-primary-orange-light outline-none min-w-[30px] h-[40px]"
				/>
				{isPending && (
					<ButtonLoader
						className={
							'h-[18px] w-[18px] stroke-primary-orange-dark'
						}
					/>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
