'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ForgotPasswordSchema } from '@/lib/helper/formValidation';
import { forgotPassword } from '@/lib/actions/auth.action';
import ButtonLoader from '../Spinners/ButtonLoader';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
	});
	const handleForgotPassword = async (
		data: z.infer<typeof ForgotPasswordSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await forgotPassword(data);
			setIsPending(false);
			if (!result.success) {
				form.setError(
					'email',
					{ type: 'custom', message: result.message },
					{ shouldFocus: true },
				);
			} else {
				toast.success(result.message);
			}
		} catch (error: any) {
			setIsPending(false);
			form.setError(
				'email',
				{ type: 'custom', message: error.message },
				{ shouldFocus: true },
			);
		}
	};

	return (
		<Form {...form}>
			<form
				className="auth-form__input-space"
				onSubmit={form.handleSubmit(handleForgotPassword)}
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

export default ForgotPassword;
