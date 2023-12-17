import { jwtVerify } from 'jose';
import { getEmailVerifySecret } from './tokenCreate';

export const getAccessSecrectKey = () => {
	const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Access token secret is required');
	}
	return secret;
};

export const verifyAuth = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getAccessSecrectKey()),
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

/* ============================================= */
// Verify the email verify token
/* ============================================= */
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
