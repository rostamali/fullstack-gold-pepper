import * as z from 'zod';

export const RegisterSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	email: z.string().min(1, { message: 'Email is required' }).email({
		message: 'Must be a valid email',
	}),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' }),
});

// export const registerUserValidate = z.object().shape({
// 	name: yup
// 		.string()
// 		.required('Name is required')
// 		.min(2, 'Name must be at least 2 characters')
// 		.max(30, 'Name must not exceed 30 characters'),
// 	email: yup
// 		.string()
// 		.required('Email is required')
// 		.matches(
// 			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// 			'Invalid email address',
// 		),
// 	password: yup
// 		.string()
// 		.required('Password is required')
// 		.min(6, 'Password must be at least 6 characters')
// 		.max(15, 'Password must not exceed 15 characters')
// 		.matches(/^\S*$/, 'Empty space not allowed'),
// });
