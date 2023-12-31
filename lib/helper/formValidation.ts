import * as z from 'zod';

const UserRole = ['ADMIN', 'USER', 'USERPLUS'];
const InvestmentStatus = ['ACCEPT', 'NOT_ACCEPT', 'PENDING', 'CANCELED'];
const ProjectStatusOptions = [
	'COMPLETED',
	'CANCELED',
	'ACTIVE',
	'DRAFT',
	'CLOSED',
	'PRIVATE',
];

export const RegisterSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' }),
});
export const CreateUserFormSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	role: z
		.string({
			required_error: 'Role is required',
		})
		.refine((value) => UserRole.includes(value), {
			message: 'Role must be one of the options: ' + UserRole.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Role is required',
			},
		),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' }),
	sendMessage: z.boolean(),
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
		.string({
			invalid_type_error: 'Investment amount must be a positive number',
		})
		.refine(
			(value) => {
				const numberValue = Number(value);
				return !isNaN(numberValue) && numberValue > 0;
			},
			{
				message: 'Investment amount must be a positive number',
			},
		)
		.transform((value) => Number(value) || 0),
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
const FileSchema = z.object({
	title: z.string(),
	fileName: z.string(),
	id: z.string(),
	url: z.string(),
	fileType: z.string(),
	description: z.string().nullable(),
});
const SelectFileSchema = z.object({
	id: z.string(),
	title: z.string(),
	url: z.string(),
	fileType: z.string(),
});
export const ProjectCategorySchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(2, { message: 'Name must be atleast 2 characters' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	description: z
		.string()
		.max(50, 'Description must not exceed 50 characters'),
	thumbnail: z.array(SelectFileSchema),
});
export const ProjectFormSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(2, { message: 'Name must be atleast 2 characters' })
		.max(100, { message: 'Name must not exceed 100 characters' }),
	location: z.string(),
	description: z.any(),
	thumbnail: z.array(SelectFileSchema),
	gallery: z.array(SelectFileSchema),
	status: z
		.string({
			required_error: 'Status is required',
		})
		.refine((value) => ProjectStatusOptions.includes(value), {
			message:
				'Status must be one of the options: ' +
				ProjectStatusOptions.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Status is required',
			},
		),
	category: z.string({
		required_error: 'Category is required',
	}),
	minInvestment: z
		.number()
		.min(1, { message: 'Minimum invest amount must be greater' }),
	capex: z.number(),
	targetAmount: z.number(),
	totalRevenue: z.number(),
	totalCost: z.number(),
	roi: z.number(),
	closeDate: z.date({
		required_error: 'Close date is required',
	}),
	documents: z.array(
		z.object({
			name: z.string().min(1, 'Name is required'),
			status: z
				.string()
				.min(1, 'Status is required')
				.refine((value) => ['PUBLIC', 'PRIVATE'].includes(value), {
					message: 'Status must be either PUBLIC or PRIVATE',
				}),
			description: z.string(),
			file: z
				.array(SelectFileSchema)
				.refine((files) => files.length > 0, {
					message: 'File is required for each document',
				}),
		}),
	),
});
export type ProjectFormType = z.infer<typeof ProjectFormSchema>;
export const UserProfileSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	phoneNumber: z.string(),
	company: z.string(),
	country: z.string(),
	state: z.string(),
	role: z
		.string({
			required_error: 'Role is required',
		})
		.refine((value) => UserRole.includes(value), {
			message: 'Role must be one of the options: ' + UserRole.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Role is required',
			},
		),
	bio: z.string().max(50, 'Bio must not exceed 50 characters'),
});
export type UserProfileType = z.infer<typeof UserProfileSchema>;
export const InvestorFormSchema = z.object({
	amount: z
		.string({
			invalid_type_error: 'Amount must be a positive number',
		})
		.refine(
			(value) => {
				const numberValue = Number(value);
				return !isNaN(numberValue) && numberValue > 0;
			},
			{
				message: 'Amount must be a positive number',
			},
		)
		.transform((value) => Number(value) || 0),
	equity: z
		.string({
			invalid_type_error: 'Equity must be a positive number',
		})
		.refine(
			(value) => {
				const numberValue = Number(value);
				return !isNaN(numberValue) && numberValue > 0;
			},
			{
				message: 'Equity must be a positive number',
			},
		)
		.transform((value) => Number(value) || 0),
	ownerShip: z
		.string({
			invalid_type_error: 'Ownership must be a positive number',
		})
		.refine(
			(value) => {
				const numberValue = Number(value);
				return !isNaN(numberValue) && numberValue > 0;
			},
			{
				message: 'Ownership must be a positive number',
			},
		)
		.transform((value) => Number(value) || 0),
	status: z
		.string({
			required_error: 'Status is required',
		})
		.refine((value) => InvestmentStatus.includes(value), {
			message:
				'Status must be one of the options: ' +
				InvestmentStatus.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Status is required',
			},
		),
	phoneNumber: z.string(),
});
