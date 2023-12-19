'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import TogglePass from './TogglePass';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/lib/helper/formValidation';
import { loginUser } from '@/lib/actions/auth.action';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import ButtonLoader from '../Spinners/ButtonLoader';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Signin = () => {
	const [showPass, setShowPass] = useState(false);
	const [showForogt, setShowForgot] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	});
	const handleLoginUser = async (data: z.infer<typeof LoginSchema>) => {
		setIsPending(true);
		try {
			const result = await loginUser(data);
			setIsPending(false);
			if (!result.success) {
				toast.error(result.message);
				setShowForgot(true);
			} else {
				toast.success(result.message);
			}
		} catch (error) {
			setShowForgot(true);
			setIsPending(false);
		}
	};

	return (
		<Form {...form}>
			<form
				className="auth-form__input-space"
				onSubmit={form.handleSubmit(handleLoginUser)}
			>
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
				<div className="grid grid-cols-2 sm:gap-[10px] gap-[4px] items-center">
					<FormField
						control={form.control}
						name="remember"
						defaultValue={false}
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="h-[18px] w-[18px] border-primary-black-thin rounded text-primary-black-dark"
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel className="auth-input__label">
										Remember me
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>
					{showForogt && (
						<div className="text-right">
							<Link
								className="form__error duration-150 hover:underline"
								href="/forgot-password"
							>
								Forgot password?
							</Link>
						</div>
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
							Login
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Signin;
