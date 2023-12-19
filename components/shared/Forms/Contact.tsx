'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { ContactFormSchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ButtonLoader from '../Spinners/ButtonLoader';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/actions/form.action';
import toast from 'react-hot-toast';

const Contact = () => {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
	});
	const handleSubmitForm = async (
		data: z.infer<typeof ContactFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await submitContactForm(data);
			setIsPending(false);
			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
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
				onSubmit={form.handleSubmit(handleSubmitForm)}
			>
				<FormField
					control={form.control}
					name="name"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label dark:text-white">
								Name
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
					name="email"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label dark:text-white">
								Email
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
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label dark:text-white">
								Message
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="acceptTerms"
					defaultValue={false}
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									className="h-[18px] w-[18px] border-primary-black-thin dark:border-white dark:text-primary-orange-light rounded text-primary-black-dark"
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel className="auth-input__label dark:text-white">
									Accept terms
								</FormLabel>
							</div>
							<FormMessage className="form__error block" />
						</FormItem>
					)}
				/>
				<div className="auth-input__group">
					<Button
						className="btn-primary gap-[5px]"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center gap-[5px]">
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
								Sending
							</div>
						) : (
							'Submit'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Contact;
