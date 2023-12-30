import { NextRequest, NextResponse } from 'next/server';
import {
	isAuthenticated,
	verifyEmailVerifyToken,
} from './lib/helper/tokenVerify';

export async function middleware(req: NextRequest) {
	const response = NextResponse.next();
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

	// forgot password page delete if there have any token
	if (req.nextUrl.pathname.startsWith('/forgot-password')) {
		response.cookies.delete('gold_refresh_token');
		response.cookies.delete('gold_access_token');
		response.cookies.delete('gold_verify_email');
		return response;
	}

	// admin dashboard access
	const refreshToken = req.cookies.get('gold_refresh_token')?.value;
	const accessToken = req.cookies.get('gold_access_token')?.value;
	const authenticated = await isAuthenticated({
		accessToken: accessToken ? accessToken : null,
		refreshToken: refreshToken ? refreshToken : null,
	});
	if (req.nextUrl.pathname.startsWith('/admin')) {
		if (!authenticated) {
			response.cookies.delete('gold_refresh_token');
			response.cookies.delete('gold_access_token');
			response.cookies.delete('gold_verify_email');
			return NextResponse.redirect(
				new URL(`/sign-in?redirect=${req.nextUrl.pathname}`, req.url),
			);
		} else if (authenticated.role === 'ADMIN') {
			return;
		} else if (authenticated.role === 'USER') {
			return NextResponse.redirect(
				new URL(`/sign-up?redirect=${req.nextUrl.pathname}`, req.url),
			);
		} else {
			response.cookies.delete('gold_refresh_token');
			response.cookies.delete('gold_access_token');
			response.cookies.delete('gold_verify_email');
			return NextResponse.redirect(
				new URL(`/sign-in?redirect=${req.nextUrl.pathname}`, req.url),
			);
		}
	}

	// portals access
	if (req.nextUrl.pathname.startsWith('/project')) {
		if (!authenticated) {
			response.cookies.delete('gold_refresh_token');
			response.cookies.delete('gold_access_token');
			response.cookies.delete('gold_verify_email');
			return NextResponse.redirect(
				new URL(`/sign-in?redirect=${req.nextUrl.pathname}`, req.url),
			);
		} else {
			return;
		}
	}

	return;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
