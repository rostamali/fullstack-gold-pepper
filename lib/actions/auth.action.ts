'use server';
import { bcryptPassword, compareCode, comparePassword } from '../helper/bcrypt';
import { verifyEmailTokenOptions } from '../helper/cookieOptions';
import {
	verifyAccessToken,
	verifyEmailVerifyToken,
	verifyForgotPasswordToken,
} from '../helper/tokenVerify';
import {
	createEmailVerifyToken,
	createForgotPasswordToken,
	sendToken,
} from '../helper/tokenCreate';
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

		const verifiedToken = await verifyAccessToken(token);
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
export const forgotPassword = async (params: { email: string }) => {
	try {
		const { email } = params;
		if (!email) return handleResponse(false, 'Email is required');
		const userExist = await prisma.user.findUnique({
			where: {
				email,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				email: true,
				passwordChangedAt: true,
			},
		});
		if (!userExist)
			return handleResponse(false, `We couldn't find your email`);
		if (!checkPasswordChangedAt(userExist.passwordChangedAt))
			return handleResponse(
				false,
				`Please wait 20 minutes before trying again`,
			);

		const forgotPasswordToken = await createForgotPasswordToken(email);
		await sendMail({
			email,
			subject: 'Forgot password email',
			template: `<h1>Forgot reset URL: ${forgotPasswordToken}</h1>`,
		});
		cookies().delete('gold_access_token');
		cookies().delete('gold_refresh_token');
		return {
			success: true,
			message: 'Password Reset Email Sent',
		};
	} catch (error) {
		return handleResponse(false, 'Oops! Something went wrong');
	}
};
export const fetchForgotPasswordToken = async (token: string) => {
	try {
		const verifiedToken = await verifyForgotPasswordToken(token);
		if (!verifiedToken) return;
		const userExist = await prisma.user.findUnique({
			where: {
				email: verifiedToken.email,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				email: true,
			},
		});
		if (!userExist) return;
		return handleResponse(true, 'Authorized user');
	} catch (error) {
		return;
	}
};
export const resetForgotPassword = async (params: {
	token: string;
	newPassword: string;
	confirmPassword: string;
}) => {
	try {
		const { token, newPassword, confirmPassword } = params;

		const verifiedToken = await verifyForgotPasswordToken(token);
		if (!verifiedToken)
			return handleResponse(false, 'Password reset token expired');
		const userExist = await prisma.user.findUnique({
			where: {
				email: verifiedToken.email,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				email: true,
				password: true,
				passwordChangedAt: true,
			},
		});
		if (!userExist)
			return handleResponse(false, `We couldn't find your email`);
		if (!checkPasswordChangedAt(userExist.passwordChangedAt))
			return handleResponse(
				false,
				`Please wait 20 minutes before trying again`,
			);
		const compareNewPass = await comparePassword(
			newPassword,
			userExist.password,
		);
		if (compareNewPass)
			return handleResponse(false, 'Choose a different password');

		const bcryptPass = await bcryptPassword(newPassword);
		await prisma.user.update({
			where: {
				id: userExist.id,
			},
			data: {
				password: bcryptPass,
				passwordChangedAt: new Date(),
			},
		});
		cookies().delete('gold_access_token');
		cookies().delete('gold_refresh_token');
		cookies().delete('gold_reset_token');
		return handleResponse(true, 'Password reset successfully');
	} catch (error) {
		return handleResponse(false, 'Something went wrong');
	}
};

// Check when the password is changed
export const checkPasswordChangedAt = (passwordChangedAt: Date | null) => {
	if (!passwordChangedAt) return true;
	const timeDifference: number =
		(new Date().getTime() - new Date(passwordChangedAt).getTime()) /
		(1000 * 60);
	if (parseInt(timeDifference.toString()) < 20) return false;
	return true;
};
