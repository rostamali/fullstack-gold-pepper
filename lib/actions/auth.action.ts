'use server';
import { bcryptPassword, compareCode, comparePassword } from '../helper/bcrypt';
import { verifyEmailTokenOptions } from '../helper/cookieOptions';
import { verifyAuth, verifyEmailVerifyToken } from '../helper/tokenVerify';
import { createEmailVerifyToken, sendToken } from '../helper/tokenCreate';
import sendMail from '../helper/sendMail';
import { handleResponse } from '../helper/serverResponse';
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
		if (userExist) return handleResponse(false, 'User already exists');
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
		return handleResponse(false, 'Oops! Something went wrong');
	}
};
export const fetchVerifyEmailUser = async () => {
	try {
		const cookie = cookies().get('gold_verify_email');
		if (!cookie) return;

		const token = cookie.value;
		const verifiedToken = await verifyEmailVerifyToken(token);
		if (!verifiedToken) return;

		return {
			success: true,
			data: verifiedToken,
		};
	} catch (error) {
		return;
	}
};
export const verifyUserEmail = async (params: { code: string }) => {
	try {
		const { code } = params as {
			code: string;
		};
		const cookie = cookies().get('gold_verify_email');
		if (!cookie) return handleResponse(false, 'Unauthorized access');

		const token = cookie.value;
		if (!token) return handleResponse(false, 'Unauthorized access');

		const verifiedToken = await verifyEmailVerifyToken(token);
		if (!verifiedToken)
			return handleResponse(false, 'User verification token expired');

		const checkCode = await compareCode(code, verifiedToken.code);
		if (!checkCode)
			return handleResponse(false, 'Email verification code not match');

		const { firstName, lastName, email, password } = verifiedToken;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExist) return handleResponse(false, 'User already exists');

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
		return handleResponse(true, 'Email verified successfully');
	} catch (error) {
		return handleResponse(false, 'Email verification failed');
	}
};
export const loginUser = async (params: LoginUser) => {
	try {
		const { email, password, remember = false } = params as LoginUser;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				email: true,
				password: true,
				role: true,
			},
		});
		if (!userExist)
			return handleResponse(false, 'Email or password is incorrect');
		const isPasswordMatch = await comparePassword(
			password,
			userExist.password,
		);
		if (!isPasswordMatch)
			return handleResponse(false, 'Email or password is incorrect');

		await prisma.user.update({
			where: { id: userExist.id },
			data: {
				lastLogin: new Date(),
			},
		});
		return sendToken(userExist, remember, 'User logged in successfully');
	} catch (error) {
		return handleResponse(false, 'Oops! Something went wrong');
	}
};
export const authProfile = async () => {
	try {
		const cookie = cookies().get('gold_access_token');
		if (!cookie) return;

		const token = cookie.value;
		if (!token) return;

		const verifiedToken = await verifyAuth(token);
		if (!verifiedToken) return;

		const userExist = await prisma.user.findUnique({
			where: {
				id: verifiedToken?.id,
			},
			select: {
				firstName: true,
				lastName: true,
				email: true,
				role: true,
			},
		});
		if (!userExist) return;
		return {
			...userExist,
		};
	} catch (error) {
		return;
	}
};
