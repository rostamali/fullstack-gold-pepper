'use server';
import { bcryptPassword, compareCode } from '../helper/bcrypt';
import { verifyEmailTokenOptions } from '../helper/cookieOptions';
import {
	createEmailVerifyToken,
	verifyEmailVerifyToken,
} from '../helper/jwtToken';
import sendMail from '../helper/sendMail';
import { prisma } from '../prisma';
import { cookies } from 'next/headers';

export const registerUser = async (params: RegisterUser) => {
	try {
		const { firstName, lastName, email, password } = params as RegisterUser;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExist) throw new Error('User already exists');
		const bcryptPass = await bcryptPassword(password);
		const user: RegisterUser = {
			firstName,
			lastName,
			email,
			password: bcryptPass,
		};
		const { token, code } = await createEmailVerifyToken(user);
		await sendMail({
			email,
			subject: 'Account activation email',
			template: `<h1>Verify Code: ${code}</h1>`,
		});

		cookies().set('gold_verify_email', token, verifyEmailTokenOptions);

		return {
			success: true,
			message: 'Verify your email now',
		};
	} catch (error) {
		return { error };
	}
};
export const fetchVerifyEmailUser = async () => {
	try {
		const cookie = cookies().get('gold_verify_email');
		if (!cookie) {
			return {
				success: false,
				message: 'Unauthorized access',
			};
		}
		const token = cookie.value;
		if (!token) {
			return {
				success: false,
				message: 'Unauthorized access',
			};
		}
		const verifiedToken = await verifyEmailVerifyToken(token);
		if (!verifiedToken) throw new Error('User verification token expired');
		return {
			success: true,
			data: verifiedToken,
		};
	} catch (error) {
		throw new Error('User verification token expired');
	}
};
export const verifyUserEmail = async (params: { code: string }) => {
	try {
		const { code } = params as {
			code: string;
		};
		const cookie = cookies().get('gold_verify_email');
		if (!cookie) {
			return {
				success: false,
				message: 'Unauthorized access',
			};
		}
		const token = cookie.value;
		if (!token) {
			return {
				success: false,
				message: 'Unauthorized access',
			};
		}
		const verifiedToken = await verifyEmailVerifyToken(token);
		if (!verifiedToken) throw new Error('User verification token expired');

		const checkCode = await compareCode(code, verifiedToken.code);
		if (!checkCode) throw new Error('Email verification code not match');

		const { firstName, lastName, email, password } = verifiedToken;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExist) throw new Error('User already exists');

		await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password,
				isVerified: true,
				status: 'ACTIVE',
			},
		});
		return {
			success: true,
			message: 'Email successfully verified',
		};
	} catch (error) {
		throw new Error('Email verification failed');
	}
};
