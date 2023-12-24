import { jwtVerify } from 'jose';
import {
	createAccessToken,
	getAccessTokenSecret,
	getEmailVerifySecret,
	getForgotPasswordTokenSecret,
	getRefreshTokenSecret,
} from './tokenCreate';
import { NextResponse } from 'next/server';
import { accessTokenOptions } from './cookieOptions';

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
			role: string;
			iat: number;
			exp: number;
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
			role: string;
			iat: number;
			exp: number;
		};
	} catch (error) {
		return;
	}
};

export const isAuthenticated = async (params: {
	refreshToken: string | null;
	accessToken: string | null;
}) => {
	try {
		const response = NextResponse.next();

		const { refreshToken, accessToken } = params;
		if (!refreshToken || !accessToken) return;
		const verifiedRefreshToken = await verifyRefreshToken(refreshToken);
		if (!verifiedRefreshToken) {
			response.cookies.delete('gold_refresh_token');
			response.cookies.delete('gold_access_token');
			return;
		}

		const verifiedAccessToken =
			accessToken && (await verifyAccessToken(accessToken));
		if (!verifiedAccessToken) {
			const newAccessToken = await createAccessToken(
				verifiedRefreshToken.id,
				verifiedRefreshToken.role,
			);
			response.cookies.set(
				'gold_access_token',
				newAccessToken,
				accessTokenOptions,
			);
			return {
				id: verifiedRefreshToken.id,
				role: verifiedRefreshToken.role,
			};
		}
		return {
			id: verifiedRefreshToken.id,
			role: verifiedRefreshToken.role,
		};
	} catch (error) {
		return;
	}
};
