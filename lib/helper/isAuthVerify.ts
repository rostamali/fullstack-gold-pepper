import { jwtVerify } from 'jose';
import { handleResponse } from './serverResponse';

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
