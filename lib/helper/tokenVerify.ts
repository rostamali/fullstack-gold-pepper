import { jwtVerify } from 'jose';
import {
	getAccessTokenSecret,
	getEmailVerifySecret,
	getForgotPasswordTokenSecret,
	getRefreshTokenSecret,
} from './tokenCreate';

export const verifyEmailVerifyToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getEmailVerifySecret()),
		);
		if (!verified) return;
		return verified.payload as {
			firstName: string;
			lastName?: string;
			email: string;
			password: string;
			code: string;
		};
	} catch (error) {
		return;
	}
};
export const verifyForgotPasswordToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getForgotPasswordTokenSecret()),
		);
		if (!verified) return;
		return verified.payload as {
			email: string;
		};
	} catch (error) {
		return;
	}
};
export const verifyRefreshToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getRefreshTokenSecret()),
		);
		if (!verified) return;
		return verified.payload as {
			id: string;
		};
	} catch (error) {
		return;
	}
};
export const verifyAccessToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getAccessTokenSecret()),
		);
		return verified.payload as {
			id: string;
			iat: number;
			exp: number;
		};
	} catch (error) {
		return;
	}
};
