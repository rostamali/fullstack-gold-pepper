import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailVerifyToken } from './lib/helper/tokenVerify';

export async function middleware(req: NextRequest) {
	// fetch email verify token
	const emailVerifyToken = req.cookies.get('gold_verify_email')?.value;
	const emailVerifiedTokenPayload =
		emailVerifyToken && (await verifyEmailVerifyToken(emailVerifyToken));
	if (
		req.nextUrl.pathname.startsWith('/sign-up/verify-email') &&
		!emailVerifiedTokenPayload
	) {
		return NextResponse.redirect(new URL('/sign-in', req.url));
	}

	return;
}

export const config = {
	matcher: [
		// '/sign-up/verify-email',
		// '/sign-up',
		// '/dashboard',
		// '/dashboard/profile',
		// '/dashboard/users',
		// '/dashboard/users/register',
		// '/signin',
		// '/sign-up/verify-email',
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
