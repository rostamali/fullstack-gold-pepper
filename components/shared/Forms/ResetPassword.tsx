'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TogglePass from './TogglePass';
import { useState } from 'react';
import { ResetPasswordSchema } from '@/lib/helper/formValidation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { resetForgotPassword } from '@/lib/actions/auth.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ButtonLoader from '../Spinners/ButtonLoader';
type ResetPasswordProps = {
	token: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
	const router = useRouter();
	const [showPass, setShowPass] = useState({
		newPassword: false,
		confirmPassword: false,
	});
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
	});
	const handleResetPassword = async (
		data: z.infer<typeof ResetPasswordSchema>,
	) => {
		setIsPending(true);

		try {
			const result = await resetForgotPassword({ ...data, token });
			setIsPending(false);

			if (!result.success) {
				toast.error(result.message);
			} else {
				toast.success(result.message);
				form.reset();
				router.push('/sign-in');
			}
		} catch (error: any) {
			setIsPending(false);
			toast.error(error.message);
		}
	};

	return (
		<Form {...form}>
			<form
				className="auth-form__input-space"
				onSubmit={form.handleSubmit(handleResetPassword)}
			>
				<FormField
					control={form.control}
					name="newPassword"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="new_password"
								className="auth-input__label"
							>
								New password
							</FormLabel>
							<FormControl>
								<div className="relative w-full">
									<Input
										id="new_password"
										className="auth-input__field"
										{...field}
										type={
											showPass.newPassword
												? 'text'
												: 'password'
										}
									/>
									<TogglePass
										showPass={showPass.newPassword}
										setShowPass={() =>
											setShowPass({
												...showPass,
												newPassword:
													!showPass.newPassword,
											})
										}
									/>
								</div>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor="confirm_password"
								className="auth-input__label"
							>
								Confirm password
							</FormLabel>
							<FormControl>
								<div className="relative w-full">
									<Input
										id="confirm_password"
										className="auth-input__field"
										{...field}
										type={
											showPass.confirmPassword
												? 'text'
												: 'password'
										}
									/>
									<TogglePass
										showPass={showPass.confirmPassword}
										setShowPass={() =>
											setShowPass({
												...showPass,
												confirmPassword:
													!showPass.confirmPassword,
											})
										}
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
							Save Password
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ResetPassword;
