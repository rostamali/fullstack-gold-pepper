'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TogglePass from './TogglePass';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { registerUser } from '@/lib/actions/auth.action';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import { useRouter } from 'next/navigation';

const Signup = () => {
	const [showPass, setShowPass] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterUser>({
		resolver: zodResolver(RegisterSchema),
	});
	const handleRegisterUser = async (data: RegisterUser) => {
		setIsPending(true);
		const result = await registerUser(data);
		setIsPending(false);
		if (result.success) {
			router.push('/sign-up/verify-email');
		}
	};

	return (
		<form
			className="auth-form__input-space"
			onSubmit={handleSubmit(handleRegisterUser)}
		>
			<div className="grid xm:grid-cols-2 gap-[20px]">
				<div className="auth-input__group">
					<Label htmlFor="first_name" className="auth-input__label">
						First name
					</Label>
					<Input
						type="text"
						id="first_name"
						className="auth-input__field"
						{...register('firstName')}
					/>
					{errors && (
						<span className="form__error">
							{errors?.firstName?.message}
						</span>
					)}
				</div>
				<div className="auth-input__group">
					<Label htmlFor="last_name" className="auth-input__label">
						Last name
					</Label>
					<Input
						type="text"
						id="last_name"
						className="auth-input__field"
						{...register('lastName')}
					/>
					{errors && (
						<span className="form__error">
							{errors?.lastName?.message}
						</span>
					)}
				</div>
			</div>
			<div className="auth-input__group">
				<Label htmlFor="email" className="auth-input__label">
					Email address
				</Label>
				<Input
					type="email"
					id="email"
					className="auth-input__field"
					{...register('email')}
				/>
				{errors && (
					<span className="form__error">
						{errors?.email?.message}
					</span>
				)}
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
						{...register('password')}
					/>
					<TogglePass showPass={showPass} setShowPass={setShowPass} />
				</div>
				{errors && (
					<span className="form__error">
						{errors?.password?.message}
					</span>
				)}
			</div>
			<div className="auth-input__group">
				<Button
					className="auth-form__btn gap-[5px]"
					disabled={isPending}
				>
					<>
						{isPending && (
							<ButtonLoader
								className={'h-[16px] w-[16px] stroke-white'}
							/>
						)}
						Continue
					</>
				</Button>
				{/* isPending */}
			</div>
		</form>
	);
};

export default Signup;
