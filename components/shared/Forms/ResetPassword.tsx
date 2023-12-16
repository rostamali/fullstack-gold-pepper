'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TogglePass from './TogglePass';
import { useState } from 'react';

const ResetPassword = () => {
	const [showPass, setShowPass] = useState({
		newPassword: false,
		confirmPassword: false,
	});

	return (
		<form className="auth-form__input-space">
			<div className="auth-input__group">
				<Label htmlFor="new_password" className="auth-input__label">
					New password
				</Label>
				<div className="relative w-full">
					<Input
						type={showPass.newPassword ? 'text' : 'password'}
						id="new_password"
						className="auth-input__field passfield-right__space"
					/>
					<TogglePass
						showPass={showPass.newPassword}
						setShowPass={() =>
							setShowPass({
								...showPass,
								newPassword: !showPass.newPassword,
							})
						}
					/>
				</div>
			</div>
			<div className="auth-input__group">
				<Label htmlFor="confirm_password" className="auth-input__label">
					Confirm password
				</Label>
				<div className="relative w-full">
					<Input
						type={showPass.confirmPassword ? 'text' : 'password'}
						id="confirm_password"
						className="auth-input__field passfield-right__space"
					/>
					<TogglePass
						showPass={showPass.confirmPassword}
						setShowPass={() =>
							setShowPass({
								...showPass,
								confirmPassword: !showPass.confirmPassword,
							})
						}
					/>
				</div>
			</div>

			<div className="auth-input__group">
				<Button className="auth-form__btn">Save Password</Button>
			</div>
		</form>
	);
};

export default ResetPassword;
