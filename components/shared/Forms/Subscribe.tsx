'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema } from '@/lib/helper/formValidation';
import { subscribeForm } from '@/lib/actions/form.action';
import { useState } from 'react';
import ButtonLoader from '../Spinners/ButtonLoader';

const Subscribe = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
	});
	const handleSubscribeForm = async (
		data: z.infer<typeof ForgotPasswordSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await subscribeForm(data);
			setIsPending(false);
			if (result.success) {
				form.setError(
					'email',
					{ type: 'custom', message: result.message },
					{ shouldFocus: true },
				);
			} else {
				form.setError(
					'email',
					{ type: 'custom', message: result.message },
					{ shouldFocus: true },
				);
			}
		} catch (error: any) {
			setIsPending(false);
			form.setError(
				'email',
				{ type: 'custom', message: error.message },
				{ shouldFocus: true },
			);
			form.reset();
		}
	};

	return (
		<div className="flex flex-col gap-[12px] mt-[30px]">
			<p className="text-base-2 dark:text-white">
				Join our newsletter to stay up to date on features and releases.
			</p>
			<Form {...form}>
				<form
					className="flex w-full max-w-sm items-center space-x-2"
					onSubmit={form.handleSubmit(handleSubscribeForm)}
				>
					<FormField
						control={form.control}
						name="email"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										className="auth-input__field"
										{...field}
										placeholder="Enter your email"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="btn-primary"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center gap-[5px]">
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
								Subscribing
							</div>
						) : (
							'Subscribe'
						)}
					</Button>
				</form>
				{form?.formState?.errors && (
					<span className="form__error">
						{form?.formState?.errors?.email?.message}
					</span>
				)}
			</Form>
			<p className="text-base-3 dark:text-white">
				By subscribing you agree to with our Privacy Policy and provide
				consent to receive updates from our company.
			</p>
		</div>
	);
};

export default Subscribe;
