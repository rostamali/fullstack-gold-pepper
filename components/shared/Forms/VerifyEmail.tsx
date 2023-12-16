'use client';
import { useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import OTPInput from 'react-otp-input';

const VerifyEmail = () => {
	const [otp, setOtp] = useState<string>('');
	return (
		<div className="auth-form__input-space">
			<div className="flex items-center gap-[5px] bg-[#f6f6f6] p-[12px] rounded-md">
				<FaCircleUser className="text-[16px] text-[#8d8181]" />
				<span className="text-base-4">rostam.developer@gmail.com</span>
			</div>
			<div className="flex flex-col gap-[6px]">
				<h4 className="heading-4 !text-primary-black-dark">
					Verification code
				</h4>
				<p className="text-base-4">
					Enter the verification code sent to your email address
				</p>
			</div>
			<OTPInput
				inputType="number"
				value={otp}
				onChange={setOtp}
				numInputs={4}
				renderSeparator={<span className="mx-[4px]"></span>}
				renderInput={(props) => <input {...props} />}
				inputStyle="border-b-2 border-primary-black-thin duration-100 focus:border-b-primary-orange-light outline-none min-w-[30px] h-[40px]"
			/>
		</div>
	);
};

export default VerifyEmail;
