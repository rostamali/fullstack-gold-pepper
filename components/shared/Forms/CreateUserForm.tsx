'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserFormSchema } from '@/lib/helper/formValidation';
import { UserRole } from '@/constants';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ButtonLoader from '../Spinners/ButtonLoader';
import TogglePass from './TogglePass';
import { createNewUserByAdmin } from '@/lib/actions/auth.action';
import toast from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';

const CreateUserForm = () => {
	const [isPending, setIsPending] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const form = useForm<z.infer<typeof CreateUserFormSchema>>({
		resolver: zodResolver(CreateUserFormSchema),
	});
	const handleUserForm = async (
		data: z.infer<typeof CreateUserFormSchema>,
	) => {
		setIsPending(true);
		try {
			const result = await createNewUserByAdmin({
				...data,
			});
			if (result.success) {
				toast.success(result.message);
				setIsPending(false);
			} else {
				toast.error(result.message);
				setIsPending(false);
			}
		} catch (error: any) {
			toast.error(error.message);
			setIsPending(false);
		}
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-[25px]"
				onSubmit={form.handleSubmit(handleUserForm)}
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
									Last name
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
						name="role"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Role
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={(val) => {
											form.setValue('role', val);
											form.clearErrors('role');
										}}
										defaultValue={form.watch('role')}
									>
										<SelectTrigger
											className="auth-input__field"
											{...field}
										>
											<SelectValue placeholder="Select Role" />
										</SelectTrigger>
										<SelectContent className="bg-white">
											{UserRole.map((role, index) => (
												<SelectItem
													className="pl-2"
													value={role.value}
													key={index}
												>
													{role.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage className="form__error" />
							</FormItem>
						)}
					/>
				</div>
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
				<FormField
					control={form.control}
					name="sendMessage"
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
				<div className="flex justify-end">
					<Button
						className="btn-primary w-full gap-[5px]"
						disabled={isPending}
					>
						<>
							{isPending && (
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
							)}
							Save new user
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default CreateUserForm;
