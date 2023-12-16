import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const alg = 'HS256';

// Create Email verification token
export const getEmailVerifyToken = () => {
	const secret = process.env.JWT_EMAIL_VERIFY_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Email verify token is required');
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
		.sign(new TextEncoder().encode(getEmailVerifyToken()));

	return { token, code };
};

export const verifyEmailVerifyToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getEmailVerifyToken()),
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
