'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserProfileSchema } from '@/lib/helper/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ButtonLoader from '../Spinners/ButtonLoader';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@/constants';
import {
	fetchUserProfileByAdmin,
	updateUserProfileByAdmin,
} from '@/lib/actions/auth.action';
import toast from 'react-hot-toast';
type UserFormProps = {
	userId: string | null;
};

const UserForm: React.FC<UserFormProps> = ({ userId }) => {
	const [isPending, setIsPending] = useState(false);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const fetchProfile = async () => {
		const result = await fetchUserProfileByAdmin({ id: userId as string });
		if (result) {
			setProfile(result);
		} else {
			setProfile(null);
		}
	};
	useEffect(() => {
		fetchProfile();
	}, [userId]);
	const form = useForm<z.infer<typeof UserProfileSchema>>({
		resolver: zodResolver(UserProfileSchema),
	});
	useEffect(() => {
		form.setValue(
			'firstName',
			profile?.firstName ? profile?.firstName : '',
		);
		form.setValue('lastName', profile?.lastName ? profile?.lastName : '');
		form.setValue('email', profile?.email ? profile?.email : '');
		form.setValue(
			'phoneNumber',
			profile?.phoneNumber ? profile?.phoneNumber : '',
		);
		form.setValue('company', profile?.company ? profile?.company : '');
		form.setValue('country', profile?.country ? profile?.country : '');
		form.setValue('state', profile?.state ? profile?.state : '');
		form.setValue('role', profile?.role ? profile?.role : 'User');
		form.setValue('bio', profile?.bio ? profile?.bio : '');
	}, [profile]);

	if (!profile)
		return (
			<div className="flex items-center justify-center">
				<ButtonLoader
					className={'h-[26px] w-[26px] stroke-primary-orange-dark'}
				/>
			</div>
		);

	const handleUserForm = async (
		userProfile: z.infer<typeof UserProfileSchema>,
	) => {
		setIsPending(true);
		try {
			if (userId) {
				const result = await updateUserProfileByAdmin({
					id: userId,
					data: {
						...userProfile,
						role: userProfile.role as UserRole,
						id: userId,
					},
				});
				if (result.success) {
					toast.success(result.message);
					setIsPending(false);
				} else {
					toast.error(result.message);
					setIsPending(false);
				}
			} else {
				setIsPending(false);
				toast.error(`Invalid user profile`);
			}
		} catch (error) {}
	};

	return (
		<Form {...form}>
			<form
				className="auth-form__input-space"
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
						name="phoneNumber"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Phone number
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
						name="company"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Company
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
						name="country"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									Country
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
						name="state"
						defaultValue=""
						render={({ field }) => (
							<FormItem>
								<FormLabel className="auth-input__label">
									State
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
					name="bio"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel className="auth-input__label">
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									className="auth-input__field"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button
						className="btn-primary gap-[5px]"
						disabled={isPending}
					>
						<>
							{isPending && (
								<ButtonLoader
									className={'h-[16px] w-[16px] stroke-white'}
								/>
							)}
							Save update
						</>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UserForm;
