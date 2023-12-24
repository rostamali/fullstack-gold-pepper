import * as z from 'zod';

export const RegisterSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z.string().min(1, { message: 'Email is required' }).email({
		message: 'Must be a valid email',
	}),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' }),
});
export const LoginSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be atleast 6 characters' }),
	remember: z.boolean(),
});
export const ContactFormSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
	message: z
		.string({
			required_error: 'Message is required',
		})
		.min(50, { message: 'Message must be atleast 50 characters' }),
	acceptTerms: z.boolean().refine((value) => value === true, {
		message: 'You must agree to the terms and conditions.',
	}),
});
export const ForgotPasswordSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
});
export const ResetPasswordSchema = z
	.object({
		newPassword: z
			.string({
				required_error: 'New password is required',
			})
			.min(6, { message: 'New password must be atleast 6 characters' })
			.max(12, { message: 'New password must be within 12 characters' }),
		confirmPassword: z
			.string({
				required_error: 'Confirm password is required',
			})
			.min(6, {
				message: 'Confirm password must be atleast 6 characters',
			})
			.max(12, {
				message: 'Confirm password must be within 12 characters',
			}),
	})
	.refine(
		(values) => {
			return values.newPassword === values.confirmPassword;
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		},
	);
export const ProjectInterestFormSchema = z.object({
	investmentAmount: z
		.number({
			required_error: 'Investment amount is required',
		})
		.min(1, { message: 'Investment amount must be greater than zero' }),
	contactPhone: z
		.string({
			required_error: 'Phone is required',
		})
		.min(1, { message: 'Phone is required' }),
	acceptTerms: z.boolean().refine((value) => value === true, {
		message: 'You must agree to the terms and conditions.',
	}),
});
export const FileUpdateSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'File name is required' })
		.max(30, { message: 'File name must not exceed 30 characters' }),
	description: z
		.string()
		.max(150, { message: 'Description must not exceed 150 characters' }),
});
