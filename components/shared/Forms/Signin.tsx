'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import TogglePass from './TogglePass';
import { Checkbox } from '@/components/ui/checkbox';

const Signin = () => {
	const [showPass, setShowPass] = useState(false);

	return (
		<form className="auth-form__input-space">
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
				<div className="flex items-center gap-[10px]">
					<Checkbox
						id="remember_me"
						className="h-[18px] w-[18px] border-primary-black-thin rounded text-primary-black-dark"
					/>
					<Label htmlFor="remember_me" className="text-base-3">
						Remember me
					</Label>
				</div>
			</div>
			<div className="auth-input__group">
				<Button className="auth-form__btn">Login</Button>
			</div>
		</form>
	);
};

export default Signin;
