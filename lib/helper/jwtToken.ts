import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { cookies } from 'next/headers';
import {
	accessTokenOptions,
	refreshTokenOptions,
	rememberAccessTokenOptions,
} from './cookieOptions';

const alg = 'HS256';

// Create Email verification token
export const getEmailVerifySecret = () => {
	const secret = process.env.JWT_EMAIL_VERIFY_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Email verify token secret is required');
	}
	return secret;
};
export const createEmailVerifyToken = async (user: RegisterUser) => {
	const code = Math.floor(1000 + Math.random() * 9000).toString();
	const hashedCode = bcrypt.hashSync(code, 10);

	const token = await new SignJWT({ ...user, code: hashedCode })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_EMAIL_VERIFY_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getEmailVerifySecret()));

	return { token, code };
};

export const verifyEmailVerifyToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getEmailVerifySecret()),
		);
		return verified.payload as {
			firstName: string;
			lastName?: string;
			email: string;
			password: string;
			code: string;
		};
	} catch (error) {
		throw new Error('Email verification token expired');
	}
};

// Send login access & refresh token
export const getAccessTokenSecret = () => {
	const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Access token secret is required');
	}
	return secret;
};
export const accessToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getAccessTokenSecret()));
};
export const rememberAccessToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_ACCESS_REMEMBER_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getAccessTokenSecret()));
};
export const getRefreshTokenSecret = () => {
	const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Access token secret is required');
	}
	return secret;
};
export const refreshToken = async (id: string) => {
	return await new SignJWT({ id })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getAccessTokenSecret()));
};

export const sendToken = async (
	user: {
		id: string;
		email: string;
		password: string;
		role: Role;
	},
	remember: boolean,
	message: string,
) => {
	const { id } = user;
	const access_token = await accessToken(id);
	const remember_access_token = await rememberAccessToken(id);
	const refresh_token = await refreshToken(id);

	cookies().set(
		'gold_access_token',
		remember ? remember_access_token : access_token,
		remember ? rememberAccessTokenOptions : accessTokenOptions,
	);
	cookies().set('gold_refresh_token', refresh_token, refreshTokenOptions);

	return {
		success: true,
		message,
		email: user.email,
		role: user.role,
	};
};
