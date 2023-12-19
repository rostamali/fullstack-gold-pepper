'use client';
import { Input } from '@/components/ui/input';
import TogglePass from './TogglePass';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { registerUser } from '@/lib/actions/auth.action';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

const Signup = () => {
	const [showPass, setShowPass] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	});

	const handleRegisterUser = async (data: z.infer<typeof RegisterSchema>) => {
		setIsPending(true);
		try {
			const result = await registerUser(data);
			setIsPending(false);
			if (result.success) {
				router.push('/sign-up/verify-email');
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			setIsPending(false);
			throw new Error('Failed to register. Please try again');
		}
	};

	return (
		<Form {...form}>
			<form
				className="auth-form__input-space"
				onSubmit={form.handleSubmit(handleRegisterUser)}
			>
				<div className="grid xm:grid-cols-2 gap-[20px]">
					<FormField
						control={form.control}
						name="firstName"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									First name
								</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="auth-input__field"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									First name
								</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="auth-input__field"
										{...field}
									/>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="email"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label">
								Email address
							</FormLabel>
							<FormControl>
								<Input
									type="email"
									className="auth-input__field"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="password"
								className="auth-input__label"
							>
								Enter password
							</FormLabel>
							<FormControl>
								<div className="relative w-full">
									<Input
										id="password"
										className="auth-input__field"
										{...field}
										type={showPass ? 'text' : 'password'}
									/>
									<TogglePass
										showPass={showPass}
										setShowPass={setShowPass}
									/>
								</div>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
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
				</div>
			</form>
		</Form>
	);
};

export default Signup;
