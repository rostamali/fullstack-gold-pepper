'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TogglePass from './TogglePass';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Signup = () => {
	const [showPass, setShowPass] = useState(false);

	return (
		<form className="auth-form__input-space">
			<div className="grid xm:grid-cols-2 gap-[20px]">
				<div className="auth-input__group">
					<Label htmlFor="first_name" className="auth-input__label">
						First name
					</Label>
					<Input
						type="text"
						id="first_name"
						className="auth-input__field"
					/>
				</div>
				<div className="auth-input__group">
					<Label htmlFor="last_name" className="auth-input__label">
						Last name
					</Label>
					<Input
						type="text"
						id="last_name"
						className="auth-input__field"
					/>
				</div>
			</div>
			<div className="auth-input__group">
				<Label htmlFor="email" className="auth-input__label">
					Email address
				</Label>
				<Input type="email" id="email" className="auth-input__field" />
			</div>
			<div className="auth-input__group">
				<Label htmlFor="password" className="auth-input__label">
					Enter password
				</Label>
				<div className="relative w-full">
					<Input
						type={showPass ? 'text' : 'password'}
						id="password"
						className="auth-input__field passfield-right__space"
					/>
					<TogglePass showPass={showPass} setShowPass={setShowPass} />
				</div>
			</div>
			<div className="auth-input__group">
				<Button className="auth-form__btn">Continue</Button>
			</div>
		</form>
	);
};

export default Signup;
